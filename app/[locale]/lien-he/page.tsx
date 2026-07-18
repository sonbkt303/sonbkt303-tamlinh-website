import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { crawledPageContent } from "@/lib/data/crawled";
import { siteConfig } from "@/lib/site-config";
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
  const tFooter = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const content = crawledPageContent.contact;

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold uppercase text-primary md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          {t("description")}
        </p>

        <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-8">
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>{tFooter("addressLabel")}:</strong> {siteConfig.address}
            </li>
            <li>
              <strong>{tFooter("factoryLabel")}:</strong> {siteConfig.factory}
            </li>
            <li>
              <strong>{tFooter("hotlineLabel")}:</strong>{" "}
              {siteConfig.phone.join(" - ")}
            </li>
            <li>
              <strong>{tFooter("emailLabel")}:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <strong>Zalo:</strong> {siteConfig.zalo}
            </li>
          </ul>
        </div>

        {content?.markdown && (
          <div className="mt-8">
            <MarkdownContent source={content.markdown} />
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
