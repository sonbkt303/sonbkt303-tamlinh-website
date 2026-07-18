import { crawledProductsByCategory } from "@/lib/data/crawled";

export const productCategories = [
  { slug: "bia-chu-noi-3d", label: "Bia mộ chữ nổi 3D" },
  { slug: "bia-liet-si", label: "Bia liệt sĩ" },
  { slug: "bia-cong-giao", label: "Bia công giáo" },
  { slug: "bia-lang-mo", label: "Bia lăng mộ" },
  { slug: "bia-co-anh", label: "Bia mộ có ảnh" },
  { slug: "bia-men-su", label: "Bia men sứ" },
  { slug: "khac", label: "Mẫu khác" },
] as const;

export function getCategoryProductCount(slug: string) {
  return crawledProductsByCategory[slug]?.length ?? 0;
}

export { crawledProductsByCategory as productsByCategory };
