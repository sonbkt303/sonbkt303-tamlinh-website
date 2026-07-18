import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TombstoneGallery } from "@/components/sections/TombstoneGallery";

type TombstonesPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({ params }: TombstonesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.tombstones" });

  return getPageMetadata("tombstones", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function TombstonesPage({
  params,
  searchParams,
}: TombstonesPageProps) {
  const { locale } = await params;
  const { category, page } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("pages.tombstones");
  const pageNum = Number(page ?? "1") || 1;

  return (
    <>
      <section className="section-padding gradient-primary text-white">
        <div className="container-main max-w-4xl text-center">
          <h1 className="heading-classic text-3xl text-accent-soft md:text-4xl">
            {t("title")}
          </h1>
          <div className="ornament-divider ornament-divider-accent-soft" />
          <p className="prose-on-dark mx-auto mt-6 max-w-2xl">{t("description")}</p>
        </div>
      </section>
      <CategoryFilter activeCategory={category} />
      <TombstoneGallery
        category={category}
        showPagination
        page={pageNum}
        perPage={24}
      />
    </>
  );
}
