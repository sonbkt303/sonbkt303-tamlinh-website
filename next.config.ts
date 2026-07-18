import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/about",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/gioi-thieu",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/en/products/tombstones",
        destination: "/san-pham/bia-mo",
        permanent: true,
      },
      {
        source: "/en/products/sandblasters",
        destination: "/may-ban-cat",
        permanent: true,
      },
      {
        source: "/san-pham/may-ban-cat",
        destination: "/may-ban-cat",
        permanent: true,
      },
      {
        source: "/en/tombstone-pricing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gia-khac-bia-mo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/tombstone-gallery",
        destination: "/100-mau-bia-mo-dep",
        permanent: true,
      },
      {
        source: "/en/news",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/en/contact",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/en/news/tombstone-engraving-guide",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
