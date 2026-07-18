"use client";

import { ImageLightbox } from "@/components/ui/ImageLightbox";

type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
};

export function ProductCard({ title, image }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white/15 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl">
      <ImageLightbox src={image} alt={title} caption={title} />
      <div className="p-4 text-center">
        <h3 className="line-clamp-2 text-base font-medium leading-snug text-white">
          {title}
        </h3>
      </div>
    </article>
  );
}
