import { siteConfig } from "@/lib/site-config";

export function BrandSlider() {
  const items = Array.from({ length: 12 }, (_, index) => index);

  return (
    <section className="overflow-hidden bg-primary py-4" aria-label="Brand logos">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-lg font-bold uppercase tracking-[0.2em] text-white/90"
          >
            {siteConfig.domain}
          </span>
        ))}
      </div>
    </section>
  );
}
