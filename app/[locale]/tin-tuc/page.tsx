import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { getPageMetadata } from "@/lib/seo";
import { Link } from "@/lib/i18n/routing";

type NewsListPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: NewsListPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.news" });

  return getPageMetadata("news", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function NewsListPage({ params }: NewsListPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.news");
  const tCommon = await getTranslations("common");
  const posts = getBlogPosts(locale);

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl lg:px-6">
        <h1 className="text-center text-3xl font-bold uppercase text-primary md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          {t("description")}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden border border-gray-200 bg-white shadow-sm"
            >
              {post.image && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <time className="text-xs text-gray-500">{post.date}</time>
                <h2 className="mt-2 text-xl font-semibold text-text-dark">
                  <Link
                    href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
                <Link
                  href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }}
                  className="mt-4 inline-block text-sm font-semibold uppercase text-primary"
                >
                  {tCommon("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
