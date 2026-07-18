import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ContactInfoProps = {
  className?: string;
};

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  icon: string;
  highlight?: "phone" | "zalo";
  wide?: boolean;
};

const highlightStyles = {
  phone: "border-cta-phone/20 bg-red-50/80",
  zalo: "border-cta-zalo/20 bg-blue-50/80",
};

export async function ContactInfo({ className = "" }: ContactInfoProps) {
  const t = await getTranslations("footer");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  const items: ContactItem[] = [
    {
      label: t("addressLabel"),
      value: siteConfig.address,
      icon: "📍",
      wide: true,
    },
    {
      label: t("hotlineLabel"),
      value: siteConfig.phone.join(" - "),
      href: `tel:${phoneHref}`,
      icon: "📞",
      highlight: "phone",
    },
    {
      label: t("emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: "✉️",
    },
    {
      label: "Zalo",
      value: siteConfig.zalo,
      href: `https://zalo.me/${siteConfig.zalo}`,
      icon: "💬",
      highlight: "zalo",
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "rounded-xl border border-primary/10 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6",
            item.wide && "sm:col-span-2",
            item.highlight && highlightStyles[item.highlight],
          )}
        >
          <div className="flex items-start gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xl"
              aria-hidden
            >
              {item.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    "focus-ring mt-1 block rounded text-base font-medium leading-7 transition hover:underline",
                    item.highlight === "phone" && "text-cta-phone",
                    item.highlight === "zalo" && "text-cta-zalo",
                    !item.highlight && "text-text-dark hover:text-primary",
                  )}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-base leading-7 text-text-dark">{item.value}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
