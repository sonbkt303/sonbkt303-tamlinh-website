import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { machineProducts } from "@/lib/data/machines";
import { siteConfig } from "@/lib/site-config";
import { FeatureList } from "@/components/ui/FeatureList";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function MachineSection() {
  const t = await getTranslations("machines");
  const features = [
    t("features.0"),
    t("features.1"),
    t("features.2"),
    t("features.3"),
  ];
  const phone = siteConfig.phone[0].replace(/\s/g, "");

  return (
    <section id="may-ban-cat" className="bg-primary-dark px-4 py-16">
      <div className="mx-auto max-w-7xl lg:px-6">
        <SectionHeading title={t("title")} variant="white" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xl font-bold uppercase text-accent">
              {t("introTitle")}
            </h3>
            <FeatureList items={features} />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${phone}`}
                className="inline-block rounded bg-cta-phone px-6 py-3 text-sm font-bold uppercase text-white transition hover:brightness-110"
              >
                {t("cta")}
              </a>
              <Link
                href="/san-pham/may-ban-cat"
                className="inline-block rounded border border-white px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white/10"
              >
                {t("viewMore")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {machineProducts.slice(0, 4).map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden bg-white/10 shadow-lg"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <h3 className="p-3 text-center text-xs font-semibold uppercase text-white">
                  {product.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {machineProducts.slice(4).map((product) => (
            <article
              key={product.slug}
              className="overflow-hidden bg-white/10 shadow-lg"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
              <h3 className="p-3 text-center text-sm font-semibold uppercase text-white">
                {product.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
