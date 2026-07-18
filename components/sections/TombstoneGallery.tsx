import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { getTombstonesByCategory } from "@/lib/data/tombstones";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TombstoneGalleryProps = {
  limit?: number;
  category?: string;
  showPagination?: boolean;
  page?: number;
  perPage?: number;
  viewMoreHref?: "/san-pham/bia-mo" | "/100-mau-bia-mo-dep";
};

export async function TombstoneGallery({
  limit,
  category,
  showPagination = false,
  page = 1,
  perPage = 24,
  viewMoreHref = "/san-pham/bia-mo",
}: TombstoneGalleryProps) {
  const t = await getTranslations("tombstoneGallery");
  const allProducts = getTombstonesByCategory(category);

  let products = allProducts;
  let totalPages = 1;

  if (showPagination) {
    totalPages = Math.max(1, Math.ceil(allProducts.length / perPage));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    products = allProducts.slice((safePage - 1) * perPage, safePage * perPage);
  } else if (limit) {
    products = allProducts.slice(0, limit);
  }

  return (
    <section className="bg-primary px-4 py-16">
      <div className="mx-auto max-w-7xl lg:px-6">
        <SectionHeading title={t("title")} variant="white" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>

        {showPagination && totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={{
                  pathname: viewMoreHref,
                  query: {
                    ...(category ? { category } : {}),
                    page: String(pageNum),
                  },
                }}
                className={`rounded px-4 py-2 text-sm font-semibold ${
                  pageNum === page
                    ? "bg-accent text-text-dark"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        )}

        {!showPagination && (
          <div className="mt-10 text-center">
            <Link
              href={viewMoreHref}
              className="inline-block rounded bg-accent px-8 py-3 text-sm font-bold uppercase text-text-dark transition hover:brightness-110"
            >
              {t("viewMore")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
