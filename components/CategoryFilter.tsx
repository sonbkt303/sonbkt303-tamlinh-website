import { Link } from "@/lib/i18n/routing";
import { productCategories } from "@/lib/data/product-categories";

type CategoryFilterProps = {
  activeCategory?: string;
};

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <div className="container-main flex flex-wrap justify-center gap-2 px-4 py-6 lg:px-6">
      <Link
        href="/san-pham/bia-mo"
        className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
          !activeCategory
            ? "bg-primary text-white"
            : "bg-surface-muted text-text-muted hover:bg-surface"
        }`}
      >
        Tất cả
      </Link>
      {productCategories.map((category) => (
        <Link
          key={category.slug}
          href={{
            pathname: "/san-pham/bia-mo",
            query: { category: category.slug },
          }}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeCategory === category.slug
              ? "bg-primary text-white"
              : "bg-surface-muted text-text-muted hover:bg-surface"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
