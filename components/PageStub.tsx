import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { Link } from "@/lib/i18n/routing";

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
    <section className="bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl text-center text-white">
        <h1 className="text-3xl font-bold uppercase text-accent md:text-4xl">
          {tPage("title")}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
          {tPage("description")}
        </p>
        <p className="mt-4 text-sm text-white/70">{tCommon("comingSoon")}</p>
        {children}
        <Link
          href="/"
          className="mt-8 inline-block rounded bg-accent px-6 py-3 text-sm font-bold uppercase text-text-dark"
        >
          {tCommon("backHome")}
        </Link>
      </div>
    </section>
  );
}
