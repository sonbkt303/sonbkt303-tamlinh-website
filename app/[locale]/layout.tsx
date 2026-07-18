import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { getDefaultMetadata } from "@/lib/seo";
import { getLocalBusinessJsonLd, getWebsiteJsonLd } from "@/lib/json-ld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import "../globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
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
    <html lang="vi-VN" className={`${lora.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full bg-background antialiased">
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
