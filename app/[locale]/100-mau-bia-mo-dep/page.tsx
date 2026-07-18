import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { TombstoneGallery } from "@/components/sections/TombstoneGallery";

type GalleryPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: GalleryPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.gallery" });

  return getPageMetadata("gallery", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function GalleryPage({
  params,
  searchParams,
}: GalleryPageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("pages.gallery");
  const pageNum = Number(page ?? "1") || 1;

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
        </div>
      </section>
      <TombstoneGallery
        showPagination
        page={pageNum}
        perPage={24}
        viewMoreHref="/100-mau-bia-mo-dep"
      />
    </>
  );
}
