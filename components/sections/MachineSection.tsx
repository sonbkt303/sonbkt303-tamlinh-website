import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SandblasterHero, SandblasterDetails } from "@/components/sections/SandblasterDetail";
import { Button, ExternalButton } from "@/components/ui/Button";

type MachineSectionProps = {
  variant?: "teaser" | "full";
};

export async function MachineSection({ variant = "teaser" }: MachineSectionProps) {
  const t = await getTranslations("machines");
  const phone = siteConfig.phone[0].replace(/\s/g, "");

  if (variant === "full") {
    return (
      <>
        <section className="section-padding gradient-primary">
          <div className="container-main">
            <SandblasterHero />
          </div>
        </section>
        <section className="section-padding bg-surface">
          <div className="container-main">
            <SandblasterDetails />
          </div>
        </section>
      </>
    );
  }

  const teaserHighlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
    t("highlights.3"),
  ];

  return (
    <section id="may-ban-cat" className="section-padding bg-primary-dark">
      <div className="container-main">
        <SectionHeading title={t("title")} variant="dark" />

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-center">
          <p className="text-base font-semibold text-accent">{t("brandLine")}</p>
          <h3 className="font-serif text-xl font-bold leading-snug text-white md:text-2xl">
            {t("headline")}
          </h3>
          <ul className="space-y-3 text-left">
            {teaserHighlights.map((item) => (
              <li key={item} className="prose-on-dark">
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <ExternalButton href={`tel:${phone}`} variant="phone">
              {t("cta")}
            </ExternalButton>
            <Button href="/may-ban-cat" variant="outline">
              {t("viewMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
