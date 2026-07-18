import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { crawledPageContent } from "@/lib/data/crawled";
import { ContactInfo } from "@/components/ui/ContactInfo";
import { Button } from "@/components/ui/Button";

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
  const aboutContent = crawledPageContent.about;

  return (
    <>
      <section className="section-padding bg-primary-dark text-white">
        <div className="container-main max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">{t("title")}</h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-accent-soft" />
          <p className="prose-on-dark mx-auto mt-6 max-w-2xl">{t("description")}</p>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main max-w-4xl">
          <ContactInfo />

          {aboutContent?.markdown && (
            <div className="mt-12 rounded-xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 border-b border-primary/10 pb-4 text-xl font-semibold text-primary-dark">
                {tAbout("title")}
              </h2>
              <MarkdownContent source={aboutContent.markdown} />
            </div>
          )}

          <div className="mt-10 text-center">
            <Button href="/">{tCommon("backHome")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
