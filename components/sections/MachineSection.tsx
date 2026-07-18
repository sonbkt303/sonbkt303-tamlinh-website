import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { sandblasterImages, sandblasterVideo } from "@/lib/data/sandblaster-media";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SandblasterDetail } from "@/components/sections/SandblasterDetail";

type MachineSectionProps = {
  variant?: "teaser" | "full";
};

export async function MachineSection({ variant = "teaser" }: MachineSectionProps) {
  const t = await getTranslations("machines");
  const phone = siteConfig.phone[0].replace(/\s/g, "");

  if (variant === "full") {
    return (
      <section className="bg-primary-dark px-4 py-16">
        <div className="mx-auto max-w-7xl lg:px-6">
          <SandblasterDetail />
        </div>
      </section>
    );
  }

  const teaserHighlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
    t("highlights.3"),
  ];

  return (
    <section id="may-ban-cat" className="bg-primary-dark px-4 py-16">
      <div className="mx-auto max-w-7xl lg:px-6">
        <SectionHeading title={t("title")} variant="white" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-accent md:text-base">{t("brandLine")}</p>
            <h3 className="font-serif text-xl font-bold leading-snug text-white md:text-2xl">
              {t("headline")}
            </h3>
            <ul className="space-y-3">
              {teaserHighlights.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-white/95 md:text-base">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`tel:${phone}`}
                className="inline-block rounded bg-cta-phone px-6 py-3 text-sm font-bold uppercase text-white transition hover:brightness-110"
              >
                {t("cta")}
              </a>
              <Link
                href="/san-pham/may-ban-cat"
                className="inline-block rounded border border-white px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white/10"
              >
                {t("viewMore")}
              </Link>
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
