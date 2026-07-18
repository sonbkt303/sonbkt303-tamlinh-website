import type { Locale } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/lib/seo";
import { MachineSection } from "@/components/sections/MachineSection";

type SandblastersPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: SandblastersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.sandblasters" });

  return getPageMetadata("sandblasters", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function SandblastersPage({ params }: SandblastersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.sandblasters");

  return (
    <>
      <section className="bg-primary px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase text-accent md:text-4xl">{t("title")}</h1>
          <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
            {t("description")}
          </p>
        </div>
      </section>
      <MachineSection variant="full" />
    </>
  );
}
