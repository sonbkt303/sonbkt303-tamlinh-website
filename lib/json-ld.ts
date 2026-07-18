import { siteConfig } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/seo";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    image: getSiteUrl("/images/hero/hero-1-17e54bba44.jpg"),
    telephone: siteConfig.phone[0],
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Hưng Yên",
      addressCountry: "VN",
    },
    areaServed: "VN",
    inLanguage: "vi-VN",
    sameAs: [siteConfig.social.facebook, siteConfig.social.youtube],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tin-tuc?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProductJsonLd(product: {
  title: string;
  image: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: getSiteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "VND",
      url: getSiteUrl(`/san-pham/bia-mo#${product.slug}`),
    },
  };
}

export function getArticleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "vi-VN",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: getSiteUrl(`/tin-tuc/${post.slug}`),
    ...(post.image ? { image: getSiteUrl(post.image) } : {}),
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
