import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Roboto, Playfair_Display } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { getDefaultMetadata } from "@/lib/seo";
import { getLocalBusinessJsonLd, getWebsiteJsonLd } from "@/lib/json-ld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

export function generateStaticParams() {
  return [{ locale: "vi" }];
}

export async function generateMetadata() {
  return getDefaultMetadata();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!routing.locales.includes(localeParam as "vi")) {
    notFound();
  }

  setRequestLocale("vi");
  const messages = await getMessages();
  const localBusinessJsonLd = getLocalBusinessJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="vi-VN" className={`${roboto.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </body>
    </html>
  );
}
