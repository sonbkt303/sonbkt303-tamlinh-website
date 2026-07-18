const seeds = Array.from({ length: 8 }, (_, i) => i + 1);

const placeholderImages = [
  "/images/hero/hero-1-17e54bba44.jpg",
  "/images/hero/hero-10-051d382336.jpg",
  "/images/hero/hero-11-7e53d60df1.jpg",
  "/images/hero/hero-12-e63d33fd44.jpg",
  "/images/hero/hero-13-e76a9da765.jpg",
  "/images/hero/hero-14-a3b14485ec.jpg",
  "/images/hero/hero-15-e8cd506371.jpg",
  "/images/hero/hero-16-715883ae2e.png",
];

export const machineProducts = seeds.map((n, index) => {
  const titles = [
    "Máy Bắn Cát Tủ 900L",
    "Máy Bắn Cát Tủ 600L",
    "Máy Bắn Cát Hộp 200L",
    "Máy Bắn Cát Công Nghiệp",
    "Bộ Phun Cát Chân Không",
    "Phụ Kiện Máy Bắn Cát",
    "Máy Bắn Cát Tủ Mini",
    "Máy Bắn Cát Tủ Đôi",
  ];

  const slugs = [
    "may-ban-cat-tu-900",
    "may-ban-cat-tu-600",
    "may-ban-cat-hop-200",
    "may-ban-cat-cong-nghiep",
    "bo-phun-cat-chan-khong",
    "phu-kien-may-ban-cat",
    "may-ban-cat-tu-mini",
    "may-ban-cat-tu-doi",
  ];

  return {
    slug: slugs[index],
    title: titles[index],
    image: placeholderImages[index],
  };
});

export type MachineProduct = (typeof machineProducts)[number];
