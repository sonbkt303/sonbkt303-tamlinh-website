import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { Button } from "@/components/ui/Button";

type PageStubProps = {
  params: Promise<{ locale: Locale }>;
  pageKey: "about" | "contact" | "tombstones" | "sandblasters" | "pricing" | "gallery" | "news";
  children?: React.ReactNode;
};

export async function PageStub({ params, pageKey, children }: PageStubProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations(`pages.${pageKey}`);
  const tCommon = await getTranslations("common");

  return (
    <section className="section-padding gradient-primary">
      <div className="container-main max-w-4xl text-center text-white">
        <h1 className="heading-classic text-3xl text-accent-soft md:text-4xl">
          {tPage("title")}
        </h1>
        <div className="ornament-divider ornament-divider-accent-soft" />
        <p className="prose-on-dark mx-auto mt-6 max-w-2xl">{tPage("description")}</p>
        <p className="mt-4 text-base text-white/70">{tCommon("comingSoon")}</p>
        {children}
        <Button href="/" variant="accent" className="mt-8">
          {tCommon("backHome")}
        </Button>
      </div>
    </section>
  );
}
