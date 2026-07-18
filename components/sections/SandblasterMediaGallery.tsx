"use client";

import { sandblasterImages } from "@/lib/data/sandblaster-media";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

type SandblasterMediaGalleryProps = {
  imageAlt: string;
};

export function SandblasterMediaGallery({ imageAlt }: SandblasterMediaGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {sandblasterImages.map((image, index) => (
        <div key={image} className="overflow-hidden rounded-xl">
          <ImageLightbox
            src={image}
            alt={`${imageAlt} ${index + 1}`}
            caption={`${imageAlt} ${index + 1}`}
            aspectClassName="aspect-[4/3]"
            sizes="(max-width: 1024px) 50vw, 25vw"
            priority={index < 2}
            imageClassName="object-cover transition duration-500 group-hover/image:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
