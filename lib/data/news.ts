import { crawledNewsItems } from "@/lib/data/crawled";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
};

export const newsItems: NewsItem[] = crawledNewsItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  date: item.date,
  image: item.image,
  excerpt: item.excerpt,
}));
