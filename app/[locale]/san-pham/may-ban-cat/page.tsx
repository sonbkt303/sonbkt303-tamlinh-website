import type { Locale } from "@/lib/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
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

  return <MachineSection variant="full" />;
}
