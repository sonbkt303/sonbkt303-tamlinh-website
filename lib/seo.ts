import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function getSiteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export const pathMap: Record<string, string> = {
  home: "/",
  about: "/gioi-thieu",
  tombstones: "/san-pham/bia-mo",
  sandblasters: "/san-pham/may-ban-cat",
  pricing: "/gia-khac-bia-mo",
  gallery: "/100-mau-bia-mo-dep",
  news: "/tin-tuc",
  contact: "/lien-he",
};

export function getPath(key: keyof typeof pathMap) {
  return pathMap[key];
}

export function getDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Tam Linh - Xưởng Khắc Bia Mộ & Máy Bắn Cát Uy Tín Hà Nội",
      template: "%s | Tam Linh",
    },
    description:
      "Xưởng khắc bia mộ & máy bắn cát uy tín tại Hà Nội. Bia mộ đá granite, chữ nổi 3D, men sứ, bia công giáo. Bảo hành 30 năm, giao hàng toàn quốc.",
    keywords: [
      "khắc bia mộ",
      "bia mộ đá granite",
      "máy bắn cát",
      "bia mộ Hà Nội",
      "chữ nổi 3D",
    ],
    openGraph: {
      locale: "vi_VN",
      type: "website",
      siteName: siteConfig.name,
    },
    alternates: {
      canonical: getSiteUrl(pathMap.home),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getPageMetadata(
  pageKey: keyof typeof pathMap,
  page: {
    title: string;
    description: string;
  },
): Metadata {
  const currentPath = pathMap[pageKey];

  return {
    ...getDefaultMetadata(),
    title: page.title,
    description: page.description,
    alternates: {
      canonical: getSiteUrl(currentPath),
    },
  };
}
