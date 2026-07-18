import * as cheerio from "cheerio";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import TurndownService from "turndown";

const BASE_URL = "https://biamophat.com";
const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public/images");
const CRAWLED_DIR = path.join(ROOT, "content/crawled");
const BLOG_DIR = path.join(ROOT, "content/blog/vi");

const imageUrlMap = new Map<string, string>();
const downloadedHashes = new Set<string>();

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

turndown.addRule("images", {
  filter: "img",
  replacement: (_content, node) => {
    const src = (node as HTMLImageElement).getAttribute("src") ?? "";
    const alt = (node as HTMLImageElement).getAttribute("alt") ?? "";
    const local = imageUrlMap.get(normalizeImageUrl(src));
    if (!local) return "";
    return `![${alt}](${local})`;
  },
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function rebrand(text: string): string {
  return text
    .replace(/Bia Mộ Phát/gi, "Tam Linh")
    .replace(/Bia Mộ Phật/gi, "Tam Linh")
    .replace(/Biamophat\.com/gi, "Tamlinh.com")
    .replace(/biamophat\.com/gi, "tamlinh.com")
    .replace(/khacbiamohn@gmail\.com/gi, "contact@tamlinh.com")
    .replace(/An Phát/gi, "Tam Linh");
}

function normalizeImageUrl(url: string): string {
  if (!url || url.startsWith("data:")) return "";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return url.split("?")[0] ?? url;
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "TamLinhWebsiteCrawler/1.0",
      Accept: "text/html,application/json,text/xml",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function downloadImage(
  remoteUrl: string,
  folder: string,
  basename?: string,
): Promise<string> {
  const normalized = normalizeImageUrl(remoteUrl);
  if (!normalized) return "";

  const existing = imageUrlMap.get(normalized);
  if (existing) return existing;

  const hash = crypto.createHash("md5").update(normalized).digest("hex").slice(0, 10);
  if (downloadedHashes.has(hash)) {
    for (const [url, local] of imageUrlMap.entries()) {
      if (local.includes(hash)) {
        imageUrlMap.set(normalized, local);
        return local;
      }
    }
  }

  const ext = path.extname(new URL(normalized).pathname) || ".jpg";
  const safeBase = basename ? slugify(basename) : "image";
  const filename = `${safeBase}-${hash}${ext}`;
  const localPath = `/images/${folder}/${filename}`;
  const absolutePath = path.join(IMAGES_DIR, folder, filename);

  ensureDir(path.dirname(absolutePath));

  const response = await fetch(normalized, {
    headers: { "User-Agent": "TamLinhWebsiteCrawler/1.0" },
  });
  if (!response.ok) {
    console.warn(`  skip image ${normalized} (${response.status})`);
    return normalized;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(absolutePath, buffer);
  downloadedHashes.add(hash);
  imageUrlMap.set(normalized, localPath);
  return localPath;
}

function categorySlugFromType(productType: string | null | undefined): string {
  if (!productType) return "khac";
  const map: Record<string, string> = {
    "bia mộ công giáo": "bia-cong-giao",
    "bia mộ liệt sĩ": "bia-liet-si",
    "bia men gốm": "bia-men-su",
    "bia men xương gốm": "bia-men-su",
    "bia lăng mộ": "bia-lang-mo",
    "câu đối bia lăng mộ": "bia-lang-mo",
    "bia mộ chữ nổi 3d": "bia-chu-noi-3d",
    "bia mộ chữ nổi": "bia-chu-noi-3d",
    "bia mộ có ảnh": "bia-co-anh",
    "khắc bia mộ theo ý tưởng": "khac-theo-y-tuong",
  };

  const key = productType.toLowerCase().trim();
  for (const [pattern, slug] of Object.entries(map)) {
    if (key.includes(pattern)) return slug;
  }
  return slugify(productType) || "khac";
}

function formatPrice(price: number, compareAt?: number): string | undefined {
  if (price <= 0) return undefined;
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

type RemoteProduct = {
  name: string;
  alias: string;
  product_type?: string | null;
  price: number;
  compare_at_price_min?: number;
  featured_image?: string | null;
  images?: string[];
};

type TombstoneItem = {
  slug: string;
  title: string;
  price?: string;
  category: string;
  image: string;
  productType?: string;
};

type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  contentMarkdown: string;
};

type PageContent = {
  slug: string;
  title: string;
  markdown: string;
  images: string[];
};

async function htmlToMarkdown(
  html: string,
  imageFolder: string,
  basename: string,
): Promise<string> {
  const $ = cheerio.load(html);

  for (const img of $("img").toArray()) {
    const src = $(img).attr("src");
    if (!src) continue;
    const local = await downloadImage(src, imageFolder, `${basename}-inline`);
    if (local.startsWith("/images/")) {
      $(img).attr("src", local);
    }
  }

  return rebrand(turndown.turndown($.html() ?? ""));
}

async function crawlHeroImages(): Promise<string[]> {
  console.log("Crawling hero images...");
  const html = await fetchText(BASE_URL);
  const $ = cheerio.load(html);
  const urls = new Set<string>();

  $("img[src]").each((_, el) => {
    const src = $(el).attr("src") ?? "";
    if (
      src.includes("slider_") ||
      src.includes("mbslider_") ||
      src.includes("section_feature")
    ) {
      urls.add(normalizeImageUrl(src));
    }
  });

  const heroPaths: string[] = [];
  let index = 0;
  for (const url of urls) {
    index += 1;
    const local = await downloadImage(url, "hero", `hero-${index}`);
    if (local.startsWith("/images/")) heroPaths.push(local);
    await sleep(200);
  }

  return heroPaths;
}

async function crawlProducts(): Promise<TombstoneItem[]> {
  console.log("Crawling products via API...");
  const raw = await fetchText(`${BASE_URL}/products.json?limit=250&page=1`);
  const data = JSON.parse(raw) as { products: RemoteProduct[] };
  const items: TombstoneItem[] = [];

  for (const product of data.products) {
    const slug = product.alias || slugify(product.name);
    const category = categorySlugFromType(product.product_type);
    const imageUrl = product.featured_image ?? product.images?.[0] ?? "";
    const localImage = imageUrl
      ? await downloadImage(imageUrl, "tombstones", slug)
      : "/images/tombstones/placeholder.jpg";

    items.push({
      slug,
      title: rebrand(product.name),
      price: formatPrice(product.price, product.compare_at_price_min) ?? "Liên hệ",
      category,
      image: localImage.startsWith("/images/") ? localImage : `/images/tombstones/${slug}.jpg`,
      productType: product.product_type ?? undefined,
    });

    if (items.length % 10 === 0) {
      console.log(`  products: ${items.length}/${data.products.length}`);
    }
    await sleep(150);
  }

  return items;
}

async function crawlNewsList(): Promise<Array<{ slug: string; title: string; path: string }>> {
  console.log("Crawling news list...");
  const articles = new Map<string, { slug: string; title: string; path: string }>();

  for (const pagePath of ["/tin-tuc", "/tin-tuc?page=2"]) {
    const html = await fetchText(`${BASE_URL}${pagePath}`);
    const $ = cheerio.load(html);

    $("h3 a[href]").each((_, el) => {
      const href = $(el).attr("href") ?? "";
      const title = rebrand($(el).text().trim());
      if (!href.startsWith("/") || href.startsWith("/tin-tuc")) return;
      const slug = href.replace(/^\//, "");
      articles.set(slug, { slug, title, path: href });
    });

    await sleep(400);
  }

  return [...articles.values()];
}

async function crawlArticle(
  article: { slug: string; title: string; path: string },
): Promise<NewsItem | null> {
  try {
    const html = await fetchText(`${BASE_URL}${article.path}`);
    const $ = cheerio.load(html);

    const dateText =
      $("time").first().text().trim() ||
      $(".article-date").first().text().trim() ||
      $(".date").first().text().trim();

    let date = "2020-01-01";
    const parsed = Date.parse(dateText);
    if (!Number.isNaN(parsed)) {
      date = new Date(parsed).toISOString().slice(0, 10);
    } else {
      const dmY = dateText.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmY) {
        date = `${dmY[3]}-${dmY[2].padStart(2, "0")}-${dmY[1].padStart(2, "0")}`;
      }
    }

    const featuredSrc =
      $('meta[property="og:image"]').attr("content") ||
      $(".article-image img").attr("src") ||
      $(".article-content img").first().attr("src") ||
      "";

    if (featuredSrc) {
      await downloadImage(featuredSrc, "news", `${article.slug}-thumb`);
    }

    const contentEl =
      $(".article-content .rte").first().length > 0
        ? $(".article-content .rte").first()
        : $(".article-content").first();

    const contentMarkdown = await htmlToMarkdown(
      contentEl.html() ?? "",
      "news",
      article.slug,
    );

    const excerpt =
      contentMarkdown.replace(/[#>*\[\]()!]/g, "").trim().slice(0, 160) ||
      rebrand(article.title);

    const thumbLocal =
      imageUrlMap.get(normalizeImageUrl(featuredSrc)) ??
      `/images/news/${article.slug}-thumb.jpg`;

    return {
      slug: article.slug,
      title: rebrand(article.title),
      date,
      excerpt,
      image: thumbLocal.startsWith("/images/") ? thumbLocal : `/images/news/${article.slug}.jpg`,
      contentMarkdown,
    };
  } catch (error) {
    console.warn(`  skip article ${article.slug}:`, error);
    return null;
  }
}

async function crawlStaticPage(
  pagePath: string,
  slug: string,
): Promise<PageContent | null> {
  try {
    console.log(`Crawling page ${pagePath}...`);
    const html = await fetchText(`${BASE_URL}${pagePath}`);
    const $ = cheerio.load(html);
    const title = rebrand($("title").text().split("-")[0]?.trim() ?? slug);

    const contentSelectors = [
      ".page-about",
      ".page-content",
      ".about-content",
      "#about",
      "main .container",
      ".section-pricing",
      ".wrap-pricing",
    ];

    let contentHtml = "";
    for (const selector of contentSelectors) {
      const el = $(selector);
      if (el.length && el.text().trim().length > 100) {
        contentHtml = el.html() ?? "";
        break;
      }
    }

    if (!contentHtml) {
      const paragraphs = $("p")
        .map((_, p) => $(p).html())
        .get()
        .filter((p) => (p?.replace(/<[^>]+>/g, "").trim().length ?? 0) > 60);
      contentHtml = paragraphs.map((p) => `<p>${p}</p>`).join("\n");
    }

    const markdown = await htmlToMarkdown(contentHtml, "pages", slug);
    const images = [...new Set(
      [...imageUrlMap.values()].filter((local) => local.includes(`/pages/${slug}`)),
    )];

    return { slug, title, markdown, images };
  } catch (error) {
    console.warn(`  skip page ${pagePath}:`, error);
    return null;
  }
}

async function crawlPricingProducts(): Promise<TombstoneItem[]> {
  console.log("Crawling pricing page products...");
  const html = await fetchText(`${BASE_URL}/gia-khac-bia-mo`);
  const $ = cheerio.load(html);
  const items: TombstoneItem[] = [];

  $(".product-item, .product-block, .item_product").each((_, el) => {
    const block = $(el);
    const link = block.find("a[href]").first().attr("href") ?? "";
    const title = rebrand(block.find(".product-name, h3, .name").first().text().trim());
    const priceText = block.find(".price, .product-price").first().text().trim();
    const imgSrc = block.find("img").first().attr("src") ?? "";
    if (!title || !link) return;

    const itemSlug = link.replace(/^\//, "");
    items.push({
      slug: itemSlug,
      title,
      price: priceText ? rebrand(priceText) : "Liên hệ",
      category: "pricing",
      image: imgSrc,
    });
  });

  for (const item of items) {
    if (item.image.startsWith("http") || item.image.startsWith("//")) {
      item.image = await downloadImage(item.image, "tombstones", item.slug);
    }
  }

  return items;
}

function writeMdxPosts(articles: NewsItem[]) {
  ensureDir(BLOG_DIR);
  for (const article of articles) {
    const frontmatter = [
      "---",
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      "locale: vi",
      `slug: ${article.slug}`,
      `date: "${article.date}"`,
      `excerpt: "${article.excerpt.replace(/"/g, '\\"').replace(/\n/g, " ")}"`,
      `image: "${article.image}"`,
      `tags: ["bia-mo"]`,
      "---",
      "",
      article.contentMarkdown,
      "",
    ].join("\n");

    fs.writeFileSync(path.join(BLOG_DIR, `${article.slug}.mdx`), frontmatter, "utf8");
  }
}

function buildProductsByCategory(products: TombstoneItem[]) {
  const byCategory: Record<string, TombstoneItem[]> = {};
  for (const product of products) {
    if (!byCategory[product.category]) byCategory[product.category] = [];
    byCategory[product.category].push(product);
  }
  return byCategory;
}

async function main() {
  ensureDir(IMAGES_DIR);
  ensureDir(CRAWLED_DIR);

  const heroImages = await crawlHeroImages();
  const qualityImage =
    heroImages.find((img) => img.includes("section_feature")) ??
    heroImages[0] ??
    "/images/hero/hero-1.jpg";

  const products = await crawlProducts();
  await crawlPricingProducts();

  const newsList = await crawlNewsList();
  const newsArticles: NewsItem[] = [];
  for (const article of newsList) {
    console.log(`  article: ${article.slug}`);
    const crawled = await crawlArticle(article);
    if (crawled) newsArticles.push(crawled);
    await sleep(400);
  }

  const pages: Record<string, PageContent> = {};
  for (const [pagePath, slug] of [
    ["/gioi-thieu", "about"],
    ["/gia-khac-bia-mo", "pricing"],
    ["/lien-he", "contact"],
  ] as const) {
    const page = await crawlStaticPage(pagePath, slug);
    if (page) pages[slug] = page;
    await sleep(400);
  }

  writeMdxPosts(newsArticles);

  const manifest = {
    crawledAt: new Date().toISOString(),
    source: BASE_URL,
    imageCount: imageUrlMap.size,
    imageMap: Object.fromEntries(imageUrlMap),
  };

  fs.writeFileSync(path.join(CRAWLED_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(
    path.join(CRAWLED_DIR, "hero.json"),
    JSON.stringify(
      {
        backgrounds: heroImages.filter((i) => i.includes("slider")),
        thumbnails: heroImages.filter((i) => i.includes("mbslider")),
        qualityImage,
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(CRAWLED_DIR, "tombstones.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(
    path.join(CRAWLED_DIR, "products-by-category.json"),
    JSON.stringify(buildProductsByCategory(products), null, 2),
  );
  fs.writeFileSync(
    path.join(CRAWLED_DIR, "news.json"),
    JSON.stringify(
      newsArticles.map(({ contentMarkdown: _c, ...rest }) => rest),
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(CRAWLED_DIR, "pages.json"), JSON.stringify(pages, null, 2));

  console.log("\nDone!");
  console.log(`  Hero images: ${heroImages.length}`);
  console.log(`  Products: ${products.length}`);
  console.log(`  News articles: ${newsArticles.length}`);
  console.log(`  Total images: ${imageUrlMap.size}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
