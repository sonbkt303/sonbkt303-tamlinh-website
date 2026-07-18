import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["vi"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/san-pham/bia-mo": "/san-pham/bia-mo",
    "/may-ban-cat": "/may-ban-cat",
    "/100-mau-bia-mo-dep": "/100-mau-bia-mo-dep",
    "/tin-tuc": "/tin-tuc",
    "/tin-tuc/[slug]": "/tin-tuc/[slug]",
    "/lien-he": "/lien-he",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
