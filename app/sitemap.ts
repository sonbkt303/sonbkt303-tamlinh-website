import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import { getSiteUrl, pathMap } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Object.values(pathMap).map((path) => ({
    url: getSiteUrl(path),
    lastModified: new Date(),
  }));

  const blogPages = getAllBlogSlugs().map(({ slug }) => ({
    url: getSiteUrl(`/tin-tuc/${slug}`),
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPages];
}
