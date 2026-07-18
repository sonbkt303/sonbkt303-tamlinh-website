import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { sandblasterImages, sandblasterVideo } from "@/lib/data/sandblaster-media";
import { siteConfig } from "@/lib/site-config";
import { ExternalButton } from "@/components/ui/Button";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="prose-body text-white/95">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContentSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-accent md:text-xl">{title}</h3>
      <BulletList items={items} />
    </div>
  );
}

function MediaGallery({ imageAlt }: { imageAlt: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {sandblasterImages.map((image, index) => (
        <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={`${imageAlt} ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            priority={index < 2}
          />
        </div>
      ))}
    </div>
  );
}

export async function SandblasterDetail() {
  const t = await getTranslations("machines");
  const tPage = await getTranslations("pages.sandblasters");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  const intro = [t("intro.0")];
  const heroHighlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
    t("highlights.3"),
  ];
  const advantages = [
    t("advantages.0"),
    t("advantages.1"),
    t("advantages.2"),
    t("advantages.3"),
    t("advantages.4"),
  ];
  const specs = [t("specs.0"), t("specs.1"), t("specs.2"), t("specs.3")];
  const commitment = [t("commitment.0"), t("commitment.1"), t("commitment.2")];

  return (
    <div className="space-y-12">
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-2xl font-bold uppercase text-accent md:text-3xl lg:text-4xl">
          {tPage("title")}
        </h1>
        <p className="prose-body mx-auto max-w-2xl text-white/85 lg:mx-0">
          {tPage("description")}
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="order-2 space-y-6 lg:order-1">
          <p className="text-base font-semibold text-accent">{t("brandLine")}</p>
          <h2 className="font-serif text-xl font-bold leading-snug text-white md:text-2xl">
            {t("headline")}
          </h2>
          <BulletList items={heroHighlights} />
          <ExternalButton href={`tel:${phoneHref}`} variant="phone">
            {t("cta")}
          </ExternalButton>
        </div>

        <div className="order-1 space-y-4 lg:order-2">
          <div className="overflow-hidden rounded-xl bg-black/30">
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
          <MediaGallery imageAlt={t("imageAlt")} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        <BulletList items={intro} />
        <p className="prose-body text-white/95">{t("audience")}</p>
        <p className="prose-body text-white/95">{t("audienceNote")}</p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-10">
        <ContentSection title={t("advantagesTitle")} items={advantages} />
        <ContentSection title={t("specsTitle")} items={specs} />
        <ContentSection title={t("commitmentTitle")} items={commitment} />
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border border-accent/30 bg-black/30 px-6 py-8 text-center">
        <p className="prose-body text-white/95">{t("contactTitle")}</p>
        <p className="mt-4 text-lg font-semibold text-accent">
          Hotline:{" "}
          <a href={`tel:${phoneHref}`} className="focus-ring rounded hover:underline">
            {phone}
          </a>
        </p>
        <p className="mt-2 text-base text-white/85">{siteConfig.address}</p>
        <ExternalButton href={`tel:${phoneHref}`} variant="phone" className="mt-6">
          {t("cta")}
        </ExternalButton>
      </div>
    </div>
  );
}
