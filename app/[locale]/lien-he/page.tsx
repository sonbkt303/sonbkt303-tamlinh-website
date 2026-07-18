import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { crawledPageContent } from "@/lib/data/crawled";
import { ContactInfo } from "@/components/ui/ContactInfo";
import { Button, ExternalButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

type ContactPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return getPageMetadata("contact", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.contact");
  const tAbout = await getTranslations("pages.about");
  const tCommon = await getTranslations("common");
  const tFloating = await getTranslations("floatingContact");
  const aboutContent = crawledPageContent.about;

  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary to-[#6b5840] text-white">
        <div className="container-main max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-soft">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-accent-soft" />
          <p className="prose-on-dark mx-auto mt-6 max-w-2xl">{t("description")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ExternalButton href={`tel:${phoneHref}`} variant="phone" size="md">
              {tFloating("call")} · {phone}
            </ExternalButton>
            <ExternalButton
              href={`https://zalo.me/${siteConfig.zalo}`}
              variant="outline"
              size="md"
              className="border-accent-soft/60 text-accent-soft hover:bg-white/10"
            >
              {tFloating("zalo")}
            </ExternalButton>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main max-w-5xl">
          <SectionHeading title={t("contactSectionTitle")} variant="light" />
          <div className="mt-10">
            <ContactInfo />
          </div>
        </div>
      </section>

      {aboutContent?.markdown && (
        <section className="section-padding bg-surface-muted">
          <div className="container-main max-w-5xl">
            <SectionHeading title={tAbout("title")} variant="light" />
            <div className="mt-10 rounded-xl border border-primary/10 bg-white p-6 shadow-sm md:p-10">
              <MarkdownContent source={aboutContent.markdown} className="prose-contact" />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-primary/10 bg-surface py-10">
        <div className="container-main text-center">
          <Button href="/" variant="ghost">
            {tCommon("backHome")}
          </Button>
        </div>
      </section>
    </>
  );
}
