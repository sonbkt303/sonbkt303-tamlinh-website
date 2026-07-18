import { siteConfig } from "@/lib/site-config";

const tickerText = [
  siteConfig.name,
  siteConfig.domain,
  siteConfig.address,
  `Hotline · Zalo: ${siteConfig.phone[0]}`,
].join("  ·  ");

export function BrandSlider() {
  const items = Array.from({ length: 5 }, (_, index) => index);

  return (
    <section className="overflow-hidden bg-primary py-4" aria-label="Thông tin liên hệ xưởng">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-sm font-semibold tracking-wide text-white/90 md:text-base"
          >
            {tickerText}
          </span>
        ))}
      </div>
    </section>
  );
}
