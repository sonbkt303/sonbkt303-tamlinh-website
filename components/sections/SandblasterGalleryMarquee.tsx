"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type SandblasterGalleryMarqueeProps = {
  images: readonly string[];
  imageAltPrefix: string;
  startIndex?: number;
  ariaLabel: string;
};

const AUTO_SCROLL_SPEED = 45;
const DRAG_THRESHOLD = 8;
const RESUME_DELAY_MS = 2000;

export function SandblasterGalleryMarquee({
  images,
  imageAltPrefix,
  startIndex = 1,
  ariaLabel,
}: SandblasterGalleryMarqueeProps) {
  const t = useTranslations("machines");
  const tLightbox = useTranslations("imageLightbox");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const stepSizeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  const measureTrack = useCallback(() => {
    if (!trackRef.current) {
      return;
    }

    halfWidthRef.current = trackRef.current.scrollWidth / 2;

    const firstItem = trackRef.current.firstElementChild as HTMLElement | null;
    if (firstItem) {
      const styles = window.getComputedStyle(trackRef.current);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      stepSizeRef.current = firstItem.offsetWidth + gap;
    }
  }, []);

  const wrapOffset = useCallback((value: number) => {
    const halfWidth = halfWidthRef.current;
    if (halfWidth <= 0) {
      return value;
    }

    let next = value;
    while (next <= -halfWidth) {
      next += halfWidth;
    }
    while (next > 0) {
      next -= halfWidth;
    }
    return next;
  }, []);

  const applyOffset = useCallback(
    (value: number) => {
      const next = wrapOffset(value);
      offsetRef.current = next;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
      }
    },
    [wrapOffset],
  );

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    clearResumeTimeout();
  }, [clearResumeTimeout]);

  const scheduleAutoResume = useCallback(() => {
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current && !isDraggingRef.current && lightboxIndex === null) {
        isPausedRef.current = false;
      }
    }, RESUME_DELAY_MS);
  }, [clearResumeTimeout, lightboxIndex]);

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const step = stepSizeRef.current;
      if (step <= 0) {
        return;
      }

      pauseAutoScroll();
      applyOffset(offsetRef.current + direction * step);
      scheduleAutoResume();
    },
    [applyOffset, pauseAutoScroll, scheduleAutoResume],
  );

  const openLightbox = useCallback(
    (index: number) => {
      pauseAutoScroll();
      setLightboxIndex(index);
    },
    [pauseAutoScroll],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    dialogRef.current?.close();
    scheduleAutoResume();
  }, [scheduleAutoResume]);

  const showPreviousImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || images.length === 0) {
      return;
    }

    measureTrack();

    const resizeObserver = new ResizeObserver(measureTrack);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [images.length, measureTrack, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || images.length === 0) {
      return;
    }

    const tick = (now: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = now;
      }

      const deltaSeconds = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isPausedRef.current && !isDraggingRef.current && halfWidthRef.current > 0) {
        applyOffset(offsetRef.current - AUTO_SCROLL_SPEED * deltaSeconds);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [applyOffset, images.length, prefersReducedMotion]);

  useEffect(() => {
    return () => clearResumeTimeout();
  }, [clearResumeTimeout]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    pauseAutoScroll();
    dialogRef.current?.showModal();
  }, [lightboxIndex, pauseAutoScroll]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNextImage, showPreviousImage]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    didDragRef.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
    pauseAutoScroll();

    activePointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragStartXRef.current;

    if (Math.abs(delta) > DRAG_THRESHOLD) {
      didDragRef.current = true;
    }

    applyOffset(dragStartOffsetRef.current + delta);
  };

  const endDrag = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event && activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (
      activePointerIdRef.current !== null &&
      event?.currentTarget.hasPointerCapture(activePointerIdRef.current)
    ) {
      event.currentTarget.releasePointerCapture(activePointerIdRef.current);
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    activePointerIdRef.current = null;

    if (isHoveredRef.current || lightboxIndex !== null) {
      isPausedRef.current = true;
      return;
    }

    scheduleAutoResume();
  };

  const handlePointerEnter = () => {
    isHoveredRef.current = true;
    pauseAutoScroll();
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;

    if (isDraggingRef.current || lightboxIndex !== null) {
      return;
    }

    scheduleAutoResume();
  };

  const handleImageClick = (index: number) => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    openLightbox(index);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeLightbox();
    }
  };

  if (images.length === 0) {
    return null;
  }

  const renderStaticGrid = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4" aria-label={ariaLabel}>
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          onClick={() => openLightbox(index)}
          aria-label={tLightbox("viewImage", {
            title: `${imageAltPrefix} ${startIndex + index}`,
          })}
          className="group/image focus-ring relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg ring-1 ring-white/10"
        >
          <Image
            src={image}
            alt={`${imageAltPrefix} ${startIndex + index}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover/image:scale-105"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-primary-dark/0 transition group-hover/image:bg-primary-dark/35"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-primary-dark/50 text-white opacity-0 transition group-hover/image:opacity-100">
              <ZoomIcon className="h-4 w-4" />
            </span>
          </span>
        </button>
      ))}
    </div>
  );

  const renderGalleryControls = () => (
    <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
      <GalleryControlButton label={t("galleryPrev")} onClick={() => scrollByStep(-1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </GalleryControlButton>
      <GalleryControlButton label={t("galleryNext")} onClick={() => scrollByStep(1)}>
        <ChevronRightIcon className="h-4 w-4" />
      </GalleryControlButton>
    </div>
  );

  const activeCaption =
    lightboxIndex !== null
      ? `${imageAltPrefix} ${startIndex + lightboxIndex}`
      : "";

  if (prefersReducedMotion) {
    return (
      <div aria-label={ariaLabel}>
        {renderStaticGrid()}
        {lightboxIndex !== null && (
          <GalleryLightboxDialog
            dialogRef={dialogRef}
            src={images[lightboxIndex]}
            alt={activeCaption}
            caption={activeCaption}
            onClose={closeLightbox}
            onPrevious={showPreviousImage}
            onNext={showNextImage}
            onBackdropClick={handleBackdropClick}
            previousLabel={t("galleryPrev")}
            nextLabel={t("galleryNext")}
            closeLabel={tLightbox("close")}
          />
        )}
      </div>
    );
  }

  const loopImages = [...images, ...images];

  return (
    <div aria-label={ariaLabel}>
      <div className="flex items-center gap-2">
        <GalleryControlButton
          label={t("galleryPrev")}
          onClick={() => scrollByStep(-1)}
          className="hidden shrink-0 sm:inline-flex"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </GalleryControlButton>

        <div
          ref={containerRef}
          className={cn(
            "min-w-0 flex-1 overflow-hidden touch-pan-y select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={trackRef} className="flex w-max gap-3 py-1 will-change-transform">
            {loopImages.map((image, index) => {
              const imageIndex = index % images.length;
              const imageNumber = startIndex + imageIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => handleImageClick(imageIndex)}
                  onPointerDown={(event) => event.stopPropagation()}
                  aria-label={tLightbox("viewImage", {
                    title: `${imageAltPrefix} ${imageNumber}`,
                  })}
                  className="group/image focus-ring relative aspect-[4/3] w-44 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-white/10 sm:w-52 md:w-60"
                >
                  <Image
                    src={image}
                    alt={`${imageAltPrefix} ${imageNumber}`}
                    fill
                    sizes="240px"
                    className="object-cover transition duration-500 group-hover/image:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-primary-dark/0 transition group-hover/image:bg-primary-dark/35"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-primary-dark/50 text-white opacity-0 transition group-hover/image:opacity-100">
                      <ZoomIcon className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <GalleryControlButton
          label={t("galleryNext")}
          onClick={() => scrollByStep(1)}
          className="hidden shrink-0 sm:inline-flex"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </GalleryControlButton>
      </div>

      {renderGalleryControls()}

      <p className="sr-only">{t("galleryStripHint")}</p>

      {lightboxIndex !== null && (
        <GalleryLightboxDialog
          dialogRef={dialogRef}
          src={images[lightboxIndex]}
          alt={activeCaption}
          caption={activeCaption}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onBackdropClick={handleBackdropClick}
          previousLabel={t("galleryPrev")}
          nextLabel={t("galleryNext")}
          closeLabel={tLightbox("close")}
        />
      )}
    </div>
  );
}

type GalleryControlButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

function GalleryControlButton({
  label,
  onClick,
  className,
  children,
}: GalleryControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 text-sm text-white/90 transition hover:border-accent-soft/40 hover:bg-white/15",
        className,
      )}
    >
      {children}
    </button>
  );
}

type GalleryLightboxDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onBackdropClick: (event: React.MouseEvent<HTMLDialogElement>) => void;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
};

function GalleryLightboxDialog({
  dialogRef,
  src,
  alt,
  caption,
  onClose,
  onPrevious,
  onNext,
  onBackdropClick,
  previousLabel,
  nextLabel,
  closeLabel,
}: GalleryLightboxDialogProps) {
  return (
    <dialog
      ref={dialogRef}
      aria-label={alt}
      className="image-lightbox-dialog"
      onClick={onBackdropClick}
      onClose={onClose}
    >
      <div className="image-lightbox-content">
        <div className="image-lightbox-frame">
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="focus-ring absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary-dark/70 text-white transition hover:bg-primary-dark"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onPrevious}
            aria-label={previousLabel}
            className="focus-ring absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-dark/70 text-white transition hover:bg-primary-dark"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={nextLabel}
            className="focus-ring absolute right-14 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-dark/70 text-white transition hover:bg-primary-dark"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="relative h-[min(85vh,720px)] w-full max-w-[min(90vw,960px)]">
            <Image src={src} alt={alt} fill sizes="90vw" className="object-contain" priority />

            <div className="image-lightbox-caption">
              <p className="text-center text-sm font-normal leading-relaxed tracking-wide md:text-base">
                {caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-3.5-3.5M11 8v6M8 11h6" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
