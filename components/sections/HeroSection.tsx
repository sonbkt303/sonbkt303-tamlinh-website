"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroBackgrounds, heroThumbnails } from "@/lib/data/hero";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  slideAlt: string;
};

export function HeroSection({ title, subtitle, slideAlt }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[520px] md:min-h-[620px]">
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
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-8 pt-10 text-center">
          <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-tight text-text-dark md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-serif text-2xl text-text-dark md:text-3xl">
            {subtitle}
          </p>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {heroThumbnails.slice(0, 3).map((image, index) => (
              <div
                key={image}
                className="relative mx-auto aspect-[2/3] w-full max-w-[220px] overflow-hidden rounded-sm shadow-2xl"
              >
                <Image
                  src={image}
                  alt={`${slideAlt} ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
