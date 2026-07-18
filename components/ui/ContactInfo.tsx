import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

type ContactInfoProps = {
  className?: string;
};

type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export async function ContactInfo({ className = "" }: ContactInfoProps) {
  const t = await getTranslations("footer");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  const items: ContactItem[] = [
    { label: t("addressLabel"), value: siteConfig.address },
    { label: t("hotlineLabel"), value: siteConfig.phone.join(" - "), href: `tel:${phoneHref}` },
    { label: t("emailLabel"), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Zalo", value: siteConfig.zalo, href: `https://zalo.me/${siteConfig.zalo}` },
  ];

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {item.label}
          </p>
          {item.href ? (
            <a
              href={item.href}
              className="focus-ring mt-2 block rounded text-base leading-7 text-text-dark transition hover:text-primary"
              {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.value}
            </a>
          ) : (
            <p className="mt-2 text-base leading-7 text-text-dark">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
