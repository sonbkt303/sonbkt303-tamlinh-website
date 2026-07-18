import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { newsItems } from "@/lib/data/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type NewsSectionProps = {
  limit?: number;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export async function NewsSection({ limit = 12 }: NewsSectionProps) {
  const t = await getTranslations("news");
  const items = newsItems.slice(0, limit);

  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-main">
        <SectionHeading title={t("title")} variant="light" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <time className="text-sm text-text-muted">{formatDate(item.date)}</time>
                <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-text-dark">
                  <Link
                    href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }}
                    className="focus-ring rounded transition hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/tin-tuc" variant="primary">
            {t("viewMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}
