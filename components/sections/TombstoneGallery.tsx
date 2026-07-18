import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { getTombstonesByCategory } from "@/lib/data/tombstones";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type TombstoneGalleryProps = {
  limit?: number;
  category?: string;
  showPagination?: boolean;
  page?: number;
  perPage?: number;
  viewMoreHref?: "/san-pham/bia-mo" | "/100-mau-bia-mo-dep";
  hideHeading?: boolean;
};

export async function TombstoneGallery({
  limit,
  category,
  showPagination = false,
  page = 1,
  perPage = 24,
  viewMoreHref = "/san-pham/bia-mo",
  hideHeading = false,
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
    <section className={`section-padding bg-primary-dark ${hideHeading ? "!pt-0" : ""}`}>
      <div className="container-main">
        {!hideHeading && <SectionHeading title={t("title")} variant="primary" />}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${hideHeading ? "" : "mt-10"}`}>
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
                className={`focus-ring rounded-lg px-4 py-2 text-sm font-semibold ${
                  pageNum === page
                    ? "bg-accent text-accent-foreground"
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
            <Button href={viewMoreHref} variant="accent">
              {t("viewMore")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
