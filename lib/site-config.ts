export const siteConfig = {
  name: "Tâm Linh Huyền Bí",
  domain: "tamlinhhuyenbi.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamlinhhuyenbi.com",
  phone: ["0987 595 794"],
  zalo: "0987595794",
  email: "thanhninh1969@gmail.com",
  address: "Ngã 3 Đống năm, Nam Đông Hưng, Tỉnh Hưng Yên (Thái Bình cũ)",
  factory: "Ngã 3 Đống năm, Nam Đông Hưng, Tỉnh Hưng Yên (Thái Bình cũ)",
  social: {
    facebook: "#",
    youtube: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
