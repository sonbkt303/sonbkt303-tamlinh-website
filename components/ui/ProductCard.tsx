import Image from "next/image";
import { getTranslations } from "next-intl/server";

type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
  price?: string;
};

export async function ProductCard({
  title,
  image,
  price,
}: ProductCardProps) {
  const t = await getTranslations("tombstoneGallery");

  return (
    <article className="group overflow-hidden bg-white/10 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4 text-center">
        <h3 className="min-h-[3rem] text-sm font-semibold uppercase leading-snug text-white md:text-base">
          {title}
        </h3>
        <p className="text-sm font-medium text-accent">
          {price ?? t("contactPrice")}
        </p>
      </div>
    </article>
  );
}
