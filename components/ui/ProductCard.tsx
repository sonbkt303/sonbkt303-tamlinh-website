import Image from "next/image";

type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
};

export function ProductCard({ title, image }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white/15 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl">
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
        <h3 className="line-clamp-2 text-base font-medium leading-snug text-white">
          {title}
        </h3>
      </div>
    </article>
  );
}
