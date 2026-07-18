import type { AppPathnames } from "@/lib/i18n/routing";

export type NavItem = {
  key: string;
  href?: AppPathnames | string;
  children?: NavItem[];
  anchor?: string;
};

export const mainNavigation: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "products",
    children: [
      {
        key: "tombstones",
        children: [
          { key: "porcelainPlaque", href: "/san-pham/bia-mo" },
          { key: "catholicPlaque", href: "/san-pham/bia-mo" },
          { key: "familyTomb", href: "/san-pham/bia-mo" },
          { key: "martyrPlaque", href: "/san-pham/bia-mo" },
          { key: "embossed3d", href: "/san-pham/bia-mo" },
          { key: "beautifulModels", href: "/100-mau-bia-mo-dep" },
        ],
      },
    ],
  },
  { key: "sandblasters", href: "/may-ban-cat" },
  { key: "gallery100", href: "/100-mau-bia-mo-dep" },
  { key: "news", href: "/tin-tuc" },
  { key: "contact", href: "/lien-he" },
];
