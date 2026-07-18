"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroBackgrounds } from "@/lib/data/hero";

type HeroSectionProps = {
  title: string;
  serviceLine1: string;
  serviceLine2: string;
  addressLine: string;
  contactLine: string;
  slideAlt: string;
};

export function HeroSection({
  title,
  serviceLine1,
  serviceLine2,
  addressLine,
  contactLine,
  slideAlt,
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/70" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center md:min-h-[640px]">
          <div className="w-full space-y-3 rounded-lg bg-black/55 px-6 py-8 backdrop-blur-sm">
            <h1 className="font-serif text-2xl font-semibold leading-tight text-white md:text-4xl">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-white/95 md:text-lg">
              {serviceLine1}
            </p>
            <p className="text-sm leading-relaxed text-white/95 md:text-lg">
              {serviceLine2}
            </p>
            <p className="text-xs leading-relaxed text-white/85 md:text-sm">
              {addressLine}
            </p>
            <p className="text-xs font-semibold text-accent md:text-sm">
              {contactLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
