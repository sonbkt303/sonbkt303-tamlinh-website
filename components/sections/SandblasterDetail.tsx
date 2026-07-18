import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { sandblasterImages, sandblasterVideo } from "@/lib/data/sandblaster-media";
import { siteConfig } from "@/lib/site-config";
import { ExternalButton } from "@/components/ui/Button";

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
          className={variant === "dark" ? "prose-body text-white/95" : "prose-body"}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContentCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface-classic p-6">
      <h3 className="mb-4 border-b border-primary/10 pb-3 text-base font-semibold leading-snug text-text-dark md:text-lg">
        {title}
      </h3>
      <BulletList items={items} variant="light" />
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

export async function SandblasterHero() {
  const t = await getTranslations("machines");
  const tPage = await getTranslations("pages.sandblasters");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div className="order-1 space-y-4">
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

      <div className="order-2 space-y-6">
        <div>
          <h1 className="heading-classic text-2xl text-white md:text-3xl lg:text-4xl">
            {tPage("title")}
          </h1>
          <div className="ornament-divider ornament-divider-accent-soft" />
        </div>
        <div className="space-y-4 rounded-xl border border-white/10 bg-black/25 p-5">
          <p className="prose-on-dark font-medium">{tPage("description")}</p>
          <p className="prose-on-dark text-white/90">{t("audience")}</p>
          <p className="text-sm leading-relaxed text-white/80">{t("audienceNote")}</p>
        </div>
        <ExternalButton href={`tel:${phoneHref}`} variant="phone">
          {t("cta")}
        </ExternalButton>
      </div>
    </div>
  );
}

export async function SandblasterDetails() {
  const t = await getTranslations("machines");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

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
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        <ContentCard title={t("advantagesTitle")} items={advantages} />
        <ContentCard title={t("specsTitle")} items={specs} />
        <ContentCard title={t("commitmentTitle")} items={commitment} />
      </div>

      <div className="surface-classic px-6 py-8 text-center">
        <p className="prose-body">{t("contactTitle")}</p>
        <p className="mt-4 text-lg font-semibold text-primary-dark">
          Hotline:{" "}
          <a
            href={`tel:${phoneHref}`}
            className="focus-ring rounded text-primary hover:underline"
          >
            {phone}
          </a>
        </p>
        <p className="mt-2 text-base text-text-muted">{siteConfig.address}</p>
      </div>
    </div>
  );
}
