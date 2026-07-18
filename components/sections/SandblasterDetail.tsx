import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { sandblasterImages, sandblasterVideo } from "@/lib/data/sandblaster-media";
import { siteConfig } from "@/lib/site-config";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="text-sm leading-relaxed text-white/95 md:text-base">
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
      <h3 className="mb-4 text-lg font-bold text-accent md:text-xl">{title}</h3>
      <BulletList items={items} />
    </div>
  );
}

export async function SandblasterDetail() {
  const t = await getTranslations("machines");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  const intro = [t("intro.0")];
  const highlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
    t("highlights.3"),
    t("highlights.4"),
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
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold text-accent md:text-base">{t("brandLine")}</p>
        <h2 className="font-serif text-2xl font-bold leading-snug text-white md:text-3xl">
          {t("headline")}
        </h2>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        <BulletList items={intro} />
        <BulletList items={highlights} />
        <p className="text-sm leading-relaxed text-white/95 md:text-base">{t("audience")}</p>
        <p className="text-sm leading-relaxed text-white/95 md:text-base">
          {t("audienceNote")}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-black/30">
        <video
          controls
          playsInline
          preload="metadata"
          poster={sandblasterImages[0]}
          className="aspect-video w-full"
        >
          <source src={sandblasterVideo} type="video/mp4" />
        </video>
        <p className="px-4 py-2 text-center text-xs text-white/70">{t("videoAlt")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {sandblasterImages.map((image, index) => (
          <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={`${t("imageAlt")} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-3xl gap-10">
        <ContentSection title={t("advantagesTitle")} items={advantages} />
        <ContentSection title={t("specsTitle")} items={specs} />
        <ContentSection title={t("commitmentTitle")} items={commitment} />
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border border-accent/30 bg-black/30 px-6 py-8 text-center">
        <p className="text-sm leading-relaxed text-white/95 md:text-base">{t("contactTitle")}</p>
        <p className="mt-4 text-lg font-bold text-accent">
          Hotline:{" "}
          <a href={`tel:${phoneHref}`} className="hover:underline">
            {phone}
          </a>
        </p>
        <p className="mt-2 text-sm text-white/85">{t("contactLocation")}</p>
        <a
          href={`tel:${phoneHref}`}
          className="mt-6 inline-block rounded bg-cta-phone px-8 py-3 text-sm font-bold uppercase text-white transition hover:brightness-110"
        >
          {t("cta")}
        </a>
      </div>
    </div>
  );
}
