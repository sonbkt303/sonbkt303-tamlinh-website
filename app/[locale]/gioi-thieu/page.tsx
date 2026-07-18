import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ContactInfo } from "@/components/ui/ContactInfo";
import { crawledPageContent } from "@/lib/data/crawled";
import { Link } from "@/lib/i18n/routing";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return getPageMetadata("about", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.about");
  const tCommon = await getTranslations("common");
  const content = crawledPageContent.about;

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
        <div className="mt-10">
          <MarkdownContent source={content?.markdown ?? t("description")} />
        </div>
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
