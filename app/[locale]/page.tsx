import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandSlider } from "@/components/sections/BrandSlider";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { TombstoneGallery } from "@/components/sections/TombstoneGallery";
import { MachineSection } from "@/components/sections/MachineSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("hero");
  const tWelcome = await getTranslations("welcome");
  const tQuality = await getTranslations("quality");
  const tTestimonials = await getTranslations("testimonials");

  const qualityFeatures = [
    tQuality("features.0"),
    tQuality("features.1"),
    tQuality("features.2"),
    tQuality("features.3"),
    tQuality("features.4"),
  ];

  const contactLine = tQuality("contactLine", {
    address: siteConfig.address,
    phones: siteConfig.phone.join(" - "),
  });

  return (
    <>
      <HeroSection
        title={tHero("title")}
        subtitle={tHero("subtitle")}
        slideAlt={tHero("slideAlt")}
      />
      <BrandSlider />
      <WelcomeSection
        title={tWelcome("title")}
        tagline={tWelcome("tagline")}
        quote={tWelcome("quote")}
        intro={tWelcome("intro")}
      />
      <QualitySection
        title={tQuality("title")}
        features={qualityFeatures}
        commitmentTitle={tQuality("commitmentTitle")}
        commitment={tQuality("commitment")}
        contactLine={contactLine}
        imageAlt={tQuality("imageAlt")}
      />
      <TombstoneGallery />
      <MachineSection />
      <NewsSection />
      <TestimonialsSection
        title={tTestimonials("title")}
        subtitle={tTestimonials("subtitle")}
      />
    </>
  );
}
