"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  aspectClassName?: string;
  imageClassName?: string;
  className?: string;
};

export function ImageLightbox({
  src,
  alt,
  caption,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  priority = false,
  aspectClassName = "aspect-[3/4]",
  imageClassName = "object-cover transition duration-500 group-hover:scale-105",
  className,
}: ImageLightboxProps) {
  const t = useTranslations("imageLightbox");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const label = caption ?? alt;

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      close();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={t("viewImage", { title: label })}
        className={cn(
          "group/image focus-ring relative block w-full cursor-pointer overflow-hidden",
          aspectClassName,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-primary-dark/0 transition group-hover/image:bg-primary-dark/35"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-primary-dark/50 text-white opacity-0 transition group-hover/image:opacity-100">
            <ZoomIcon className="h-5 w-5" />
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={caption ? titleId : undefined}
        aria-label={caption ? undefined : alt}
        className="image-lightbox-dialog"
        onClick={handleBackdropClick}
        onClose={close}
      >
        <div className="image-lightbox-content">
          <div className="image-lightbox-frame">
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="focus-ring absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary-dark/70 text-white transition hover:bg-primary-dark"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <div className="relative h-[min(85vh,720px)] w-full max-w-[min(90vw,960px)]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            {caption && (
              <p
                id={titleId}
                className="image-lightbox-caption mt-2 max-w-full px-4 py-2 text-center text-sm leading-relaxed md:text-base"
              >
                {caption}
              </p>
            )}
          </div>
        </div>
      </dialog>
    </>
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
