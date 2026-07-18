import Image from "next/image";

type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
};

export function ProductCard({ title, image }: ProductCardProps) {
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
      <div className="p-4 text-center">
        <h3 className="min-h-[3rem] text-sm font-semibold uppercase leading-snug text-white md:text-base">
          {title}
        </h3>
      </div>
    </article>
  );
}
