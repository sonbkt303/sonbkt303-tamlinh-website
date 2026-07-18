import { Link } from "@/lib/i18n/routing";
import { productCategories } from "@/lib/data/product-categories";

type CategoryFilterProps = {
  activeCategory?: string;
};

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 py-6 lg:px-6">
      <Link
        href="/san-pham/bia-mo"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          !activeCategory
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeCategory === category.slug
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
