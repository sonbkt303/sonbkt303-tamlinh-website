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
  tombstones: "/san-pham/bia-mo",
  sandblasters: "/may-ban-cat",
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
      default: `${siteConfig.name} - Máy Phun Cát & Khắc Bia Mộ Đá Granite`,
      template: `%s | ${siteConfig.name}`,
    },
    description:
      "Xưởng sản xuất máy phun cát tuần hoàn không bụi và chế tác bia mộ đá granite tại Hưng Yên. Chạm khắc chữ nổi 3D, men sứ, bia công giáo. Giao hàng toàn quốc.",
    keywords: [
      "khắc bia mộ",
      "bia mộ đá granite",
      "máy phun cát",
      "máy bắn cát",
      "bia mộ Hưng Yên",
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
