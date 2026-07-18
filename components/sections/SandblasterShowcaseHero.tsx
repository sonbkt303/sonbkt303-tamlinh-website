"use client";

import { useTranslations } from "next-intl";
import {
  sandblasterHeroImages,
  sandblasterImages,
  sandblasterStripImages,
  sandblasterVideo,
} from "@/lib/data/sandblaster-media";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { SandblasterGalleryMarquee } from "@/components/sections/SandblasterGalleryMarquee";

const heroGridImages = sandblasterHeroImages.slice(0, 4);
const showcaseHighlights = ["0", "1", "2", "3"] as const;

export function SandblasterShowcaseHero() {
  const t = useTranslations("machines");

  return (
    <section className="gradient-primary section-padding">
      <div className="container-main">
        <h1 className="sr-only">{siteConfig.name}</h1>

        <div className="mb-8 text-center lg:mb-10">
          <h2 className="heading-classic text-2xl text-white md:text-3xl">
            {t("showcaseIntroTitle")}
          </h2>
          <div className="ornament-divider ornament-divider-light mx-auto" />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">
            {t("showcaseIntroDesc")}
          </p>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
          <div>
            <p className="mb-2 text-center text-sm font-medium tracking-wide text-accent-soft md:text-left">
              {t("showcaseVideoLabel")}
            </p>
            <div className="overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10">
              <video
                controls
                playsInline
                preload="metadata"
                poster={sandblasterImages[0]}
                className="aspect-video w-full"
              >
                <source src={sandblasterVideo} type="video/mp4" />
              </video>
              <p className="px-4 py-2 text-center text-sm text-white/70">{t("videoAlt")}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-center text-sm font-medium tracking-wide text-accent-soft md:text-left">
              {t("showcaseGalleryLabel")}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {heroGridImages.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-xl ring-1 ring-white/10">
                  <ImageLightbox
                    src={image}
                    alt={`${t("imageAlt")} ${index + 1}`}
                    caption={`${t("imageAlt")} ${index + 1}`}
                    aspectClassName="aspect-[4/3]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                    imageClassName="object-cover transition duration-500 group-hover/image:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="heading-classic mb-3 text-lg text-accent-soft md:text-xl">
                {t("showcaseMachineTitle")}
              </h2>
              <p className="prose-on-dark">{t("showcaseMachineDesc")}</p>
            </div>
            <div>
              <h2 className="heading-classic mb-3 text-lg text-accent-soft md:text-xl">
                {t("showcaseResultTitle")}
              </h2>
              <p className="prose-on-dark">{t("showcaseResultDesc")}</p>
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            {showcaseHighlights.map((key) => (
              <li key={key} className="text-sm text-white/85">
                {t(`highlights.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center md:justify-start">
            <Button href="/may-ban-cat" variant="accent">
              {t("viewMore")} →
            </Button>
          </div>
        </div>

        {sandblasterStripImages.length > 0 && (
          <div className="mt-8 lg:mt-10">
            <h3 className="heading-classic mb-2 text-center text-lg text-white md:text-left md:text-xl">
              {t("galleryStripLabel")}
            </h3>
            <p className="mb-4 text-center text-sm text-white/75 md:text-left">
              {t("galleryStripHint")}
            </p>
            <SandblasterGalleryMarquee
              images={sandblasterStripImages}
              imageAltPrefix={t("imageAlt")}
              startIndex={heroGridImages.length + 1}
              ariaLabel={t("galleryStripLabel")}
            />
          </div>
        )}
      </div>
    </section>
  );
}
