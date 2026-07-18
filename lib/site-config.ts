export const siteConfig = {
  name: "Tam Linh",
  domain: "tamlinh.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamlinh.com",
  phone: ["0399 833 888", "0399 383 888"],
  zalo: "0399833888",
  email: "contact@tamlinh.com",
  address: "1162 Đường Láng, Láng Thượng, Đống Đa, Hà Nội",
  factory: "Chân Núi Trầm, Xã Phụng Châu, Chương Mỹ, Hà Nội",
  social: {
    facebook: "#",
    youtube: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
