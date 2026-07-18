import crawledTombstones from "@/content/crawled/tombstones.json";
import crawledNews from "@/content/crawled/news.json";
import crawledHero from "@/content/crawled/hero.json";
import crawledPages from "@/content/crawled/pages.json";
import crawledCategories from "@/content/crawled/products-by-category.json";

export type CrawledTombstone = {
  slug: string;
  title: string;
  price?: string;
  category: string;
  image: string;
  productType?: string;
};

export type CrawledNews = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export type CrawledPage = {
  slug: string;
  title: string;
  markdown: string;
  images: string[];
};

export const crawledTombstoneItems = crawledTombstones as CrawledTombstone[];
export const crawledNewsItems = crawledNews as CrawledNews[];
export const crawledPageContent = crawledPages as Record<string, CrawledPage>;
export const crawledProductsByCategory = crawledCategories as Record<
  string,
  CrawledTombstone[]
>;

export const heroBackgrounds =
  crawledHero.backgrounds.length > 0
    ? crawledHero.backgrounds
    : [
        "/images/hero/hero-1-17e54bba44.jpg",
        "/images/hero/hero-2-673562dc54.jpg",
        "/images/hero/hero-3-f1e877b2ae.jpg",
        "/images/hero/hero-4-cfd82387c1.jpg",
      ];

export const heroThumbnails =
  crawledHero.thumbnails.length > 0
    ? crawledHero.thumbnails
    : [
        "/images/hero/hero-5-dd4b8df569.jpg",
        "/images/hero/hero-6-4350356372.jpg",
        "/images/hero/hero-7-7f1effc61f.jpg",
      ];

export const qualityImage =
  crawledHero.qualityImage ?? "/images/hero/hero-16-715883ae2e.png";
