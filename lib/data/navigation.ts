import type { AppPathnames } from "@/lib/i18n/routing";

export type NavItem = {
  key: string;
  href?: AppPathnames | string;
  children?: NavItem[];
  anchor?: string;
};

export const mainNavigation: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/gioi-thieu" },
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
      {
        key: "sandblasters",
        children: [
          { key: "cabinetBlaster", href: "/san-pham/may-ban-cat" },
          { key: "boxBlaster", href: "/san-pham/may-ban-cat" },
          { key: "blasterAccessories", href: "/san-pham/may-ban-cat" },
        ],
      },
    ],
  },
  { key: "pricing", href: "/gia-khac-bia-mo" },
  { key: "gallery100", href: "/100-mau-bia-mo-dep" },
  { key: "news", href: "/tin-tuc" },
  { key: "contact", href: "/lien-he" },
];
