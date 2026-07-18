import { getTranslations } from "next-intl/server";
import {
  sandblasterHeroImages,
  sandblasterImages,
  sandblasterVideo,
} from "@/lib/data/sandblaster-media";
import { sandblasterYouTubeVideos } from "@/lib/data/sandblaster-videos";
import { siteConfig } from "@/lib/site-config";
import { ExternalButton } from "@/components/ui/Button";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { SandblasterMediaGallery } from "@/components/sections/SandblasterMediaGallery";

function BulletList({
  items,
  variant = "light",
}: {
  items: string[];
  variant?: "dark" | "light";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={variant === "dark" ? "text-white/95 leading-relaxed" : "prose-on-light"}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContentCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface-classic h-full p-6">
      <h3 className="mb-4 border-b border-primary/15 pb-3 text-base font-semibold leading-snug text-text-dark md:text-lg">
        {title}
      </h3>
      <BulletList items={items} variant="light" />
    </div>
  );
}

const heroGridImages = sandblasterHeroImages.slice(0, 4);
const highlightKeys = ["0", "1", "2", "3"] as const;

export async function SandblasterHero() {
  const t = await getTranslations("machines");
  const tPage = await getTranslations("pages.sandblasters");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="heading-classic text-2xl text-white md:text-3xl lg:text-4xl">
          {tPage("title")}
        </h1>
        <div className="ornament-divider ornament-divider-light" />
        <p className="mt-4 text-base leading-relaxed text-white/95 md:text-lg">
          {tPage("description")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{t("audienceNote")}</p>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
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
          <p className="px-4 py-2 text-center text-sm text-white/80">{t("videoAlt")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {heroGridImages.map((image, index) => (
            <div
              key={image}
              className="overflow-hidden rounded-xl ring-1 ring-white/10"
            >
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-black/30 p-5">
          <h2 className="heading-classic mb-3 text-lg text-white md:text-xl">
            {t("showcaseMachineTitle")}
          </h2>
          <p className="text-sm leading-relaxed text-white/90 md:text-base">
            {t("showcaseMachineDesc")}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-black/30 p-5">
          <h2 className="heading-classic mb-3 text-lg text-white md:text-xl">
            {t("showcaseResultTitle")}
          </h2>
          <p className="text-sm leading-relaxed text-white/90 md:text-base">
            {t("showcaseResultDesc")}
          </p>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {highlightKeys.map((key) => (
          <li key={key} className="text-sm text-white/95">
            {t(`highlights.${key}`)}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center gap-4">
        <ExternalButton href={`tel:${phoneHref}`} variant="phone">
          {t("cta")}
        </ExternalButton>
      </div>
    </div>
  );
}

export async function SandblasterYouTubeSection() {
  const t = await getTranslations("machines");

  return (
    <div className="space-y-8">
      <SectionHeading title={t("youtubeSectionTitle")} variant="light" />
      <p className="prose-on-light mx-auto max-w-3xl text-center">{t("youtubeSectionDesc")}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sandblasterYouTubeVideos.map((video) => (
          <article key={video.id} className="flex flex-col gap-3">
            <YouTubeEmbed
              video={video}
              title={t(`youtubeVideos.${video.titleKey}.title`)}
            />
            <div>
              <h3 className="text-base font-semibold text-text-dark md:text-lg">
                {t(`youtubeVideos.${video.titleKey}.title`)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-dark/80">
                {t(`youtubeVideos.${video.titleKey}.desc`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function SandblasterDetails() {
  const t = await getTranslations("machines");

  const advantages = [
    t("advantages.0"),
    t("advantages.1"),
    t("advantages.2"),
    t("advantages.3"),
    t("advantages.4"),
  ];
  const specs = [t("specs.0"), t("specs.1"), t("specs.2"), t("specs.3")];
  const commitment = [t("commitment.0"), t("commitment.1"), t("commitment.2")];
  const applications = [t("applications.0"), t("applications.1"), t("applications.2")];

  return (
    <div className="space-y-10">
      <SectionHeading title={t("applicationsTitle")} variant="dark" />
      <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-white/95 md:text-lg">
        {t("applicationsDesc")}
      </p>

      <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
        {applications.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-center text-sm leading-relaxed text-white/95"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="grid gap-6 md:grid-cols-3">
        <ContentCard title={t("advantagesTitle")} items={advantages} />
        <ContentCard title={t("specsTitle")} items={specs} />
        <ContentCard title={t("commitmentTitle")} items={commitment} />
      </div>
    </div>
  );
}

export async function SandblasterGallerySection() {
  const t = await getTranslations("machines");

  return (
    <div className="space-y-8">
      <SectionHeading title={t("gallerySectionTitle")} variant="light" />
      <p className="prose-on-light mx-auto max-w-3xl text-center">{t("gallerySectionDesc")}</p>
      <SandblasterMediaGallery imageAlt={t("imageAlt")} />
    </div>
  );
}

export async function SandblasterContactCta() {
  const t = await getTranslations("machines");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  return (
    <div className="surface-classic mx-auto max-w-2xl px-6 py-8 text-center">
      <p className="text-base font-medium leading-relaxed text-text-dark md:text-lg">
        {t("contactTitle")}
      </p>
      <p className="mt-4 text-lg font-semibold text-primary-dark">
        Hotline:{" "}
        <a
          href={`tel:${phoneHref}`}
          className="focus-ring rounded text-primary hover:underline"
        >
          {phone}
        </a>
      </p>
      <p className="mt-2 text-base text-text-dark/75">{siteConfig.address}</p>
      <div className="mt-6">
        <ExternalButton href={`tel:${phoneHref}`} variant="phone">
          {t("cta")}
        </ExternalButton>
      </div>
    </div>
  );
}
