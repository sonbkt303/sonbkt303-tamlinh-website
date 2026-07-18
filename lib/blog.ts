import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/lib/i18n/routing";

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  tags: string[];
  content: string;
  readingTime: string;
};

const contentDirectory = path.join(process.cwd(), "content/blog");

export function getBlogPosts(locale: Locale = "vi"): BlogPost[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(localeDir, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug: (data.slug as string) ?? slug,
        locale,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        image: data.image as string | undefined,
        tags: (data.tags as string[]) ?? [],
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | null {
  return getBlogPosts(locale).find((post) => post.slug === slug) ?? null;
}

export function getAllBlogSlugs() {
  return getBlogPosts("vi").map((post) => ({ locale: "vi" as const, slug: post.slug }));
}
