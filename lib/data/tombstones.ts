import { crawledTombstoneItems } from "@/lib/data/crawled";

export const tombstoneProducts = crawledTombstoneItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  image: item.image,
  productType: item.productType,
}));

export type TombstoneProduct = (typeof tombstoneProducts)[number];

export function getTombstonesByCategory(category?: string) {
  if (!category) return tombstoneProducts;
  return tombstoneProducts.filter((product) => product.category === category);
}
