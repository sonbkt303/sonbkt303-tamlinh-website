import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { crawledPageContent } from "@/lib/data/crawled";
import { ContactInfo } from "@/components/ui/ContactInfo";
import { Link } from "@/lib/i18n/routing";

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
  const contactContent = crawledPageContent.contact;

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold uppercase text-primary md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          {t("description")}
        </p>

        <ContactInfo className="mt-10" />

        {aboutContent?.markdown && (
          <div className="mt-10">
            <h2 className="mb-6 text-xl font-bold uppercase text-primary">
              {tAbout("title")}
            </h2>
            <MarkdownContent source={aboutContent.markdown} />
          </div>
        )}

        {contactContent?.markdown && (
          <div className="mt-8">
            <MarkdownContent source={contactContent.markdown} />
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block rounded bg-primary px-6 py-3 text-sm font-bold uppercase text-white"
          >
            {tCommon("backHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
