import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Locale } from "@/lib/i18n/routing";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { getSiteUrl } from "@/lib/seo";
import { getArticleJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";
import { Link } from "@/lib/i18n/routing";

type NewsDetailPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPost("vi", slug);

  if (!post) {
    return {};
  }

  const canonicalUrl = getSiteUrl(`/tin-tuc/${post.slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      locale: "vi_VN",
      type: "article",
      siteName: siteConfig.name,
      ...(post.image ? { images: [{ url: getSiteUrl(post.image) }] } : {}),
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      ...(post.image ? { images: [getSiteUrl(post.image)] } : {}),
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost("vi", slug);

  if (!post) {
    notFound();
  }

  const tCommon = await getTranslations("common");
  const articleJsonLd = getArticleJsonLd(post);

  return (
    <article className="section-padding bg-surface">
      <div className="container-main max-w-3xl">
        <Link href="/tin-tuc" className="focus-ring text-sm font-semibold text-primary">
          ← {tCommon("backHome")}
        </Link>
        <header className="mt-6">
          <time className="text-sm text-text-muted">{post.date}</time>
          <h1 className="mt-3 font-serif text-3xl font-bold text-text-dark md:text-4xl">
            {post.title}
          </h1>
          <p className="prose-body mt-4">{post.excerpt}</p>
        </header>
        {post.image && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="prose prose-lg mt-10 max-w-none text-text-muted">
          <MDXRemote source={post.content} />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
    </article>
  );
}
