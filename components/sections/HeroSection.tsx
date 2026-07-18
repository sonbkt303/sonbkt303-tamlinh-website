"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroBackgrounds } from "@/lib/data/hero";
import { siteConfig } from "@/lib/site-config";

type HeroSectionProps = {
  slideAlt: string;
};

export function HeroSection({ slideAlt }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <h1 className="sr-only">{siteConfig.name}</h1>
      <div className="relative min-h-[560px] md:min-h-[640px]">
        {heroBackgrounds.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={slideAlt}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 via-primary-dark/20 to-primary-dark/60" />
      </div>
    </section>
  );
}
