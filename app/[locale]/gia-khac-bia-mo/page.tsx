import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { crawledPageContent } from "@/lib/data/crawled";
import { TombstoneGallery } from "@/components/sections/TombstoneGallery";
import { Link } from "@/lib/i18n/routing";

type PricingPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });

  return getPageMetadata("pricing", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.pricing");
  const tCommon = await getTranslations("common");
  const content = crawledPageContent.pricing;

  return (
    <>
      <section className="bg-primary px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase text-accent md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
            {t("description")}
          </p>
          {content?.markdown && (
            <div className="prose prose-invert mx-auto mt-6 max-w-2xl text-left text-white/90">
              <MarkdownContent source={content.markdown} className="prose-invert text-white/90" />
            </div>
          )}
        </div>
      </section>
      <TombstoneGallery showPagination perPage={24} />
      <div className="bg-white py-8 text-center">
        <Link
          href="/"
          className="inline-block rounded bg-primary px-6 py-3 text-sm font-bold uppercase text-white"
        >
          {tCommon("backHome")}
        </Link>
      </div>
    </>
  );
}
