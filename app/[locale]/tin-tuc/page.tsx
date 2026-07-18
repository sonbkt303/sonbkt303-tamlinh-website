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
    <section className="section-padding bg-surface">
      <div className="container-main">
        <h1 className="heading-classic text-center text-3xl text-primary-dark md:text-4xl">
          {t("title")}
        </h1>
        <div className="ornament-divider" />
        <p className="prose-body mx-auto mt-4 max-w-2xl text-center">{t("description")}</p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm"
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
                <time className="text-sm text-text-muted">{post.date}</time>
                <h2 className="mt-2 text-xl font-semibold text-text-dark">
                  <Link
                    href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }}
                    className="focus-ring rounded transition hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="prose-body mt-3">{post.excerpt}</p>
                <Link
                  href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }}
                  className="focus-ring mt-4 inline-block text-sm font-semibold text-primary"
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
