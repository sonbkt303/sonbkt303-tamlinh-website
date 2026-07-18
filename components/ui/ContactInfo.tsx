import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ContactInfoProps = {
  className?: string;
};

type ContactCardProps = {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  accent?: "phone" | "zalo" | "default";
  wide?: boolean;
};

const accentStyles = {
  phone: {
    card: "border border-cta-phone/15 bg-red-50/50 hover:border-cta-phone/25",
    icon: "bg-cta-phone/10 text-cta-phone",
    value: "text-cta-phone",
    arrow: "text-cta-phone/40 group-hover:text-cta-phone",
  },
  zalo: {
    card: "border border-cta-zalo/15 bg-blue-50/50 hover:border-cta-zalo/25",
    icon: "bg-cta-zalo/10 text-cta-zalo",
    value: "text-cta-zalo",
    arrow: "text-cta-zalo/40 group-hover:text-cta-zalo",
  },
  default: {
    card: "surface-classic border-primary/12 hover:border-primary/20",
    icon: "bg-primary/10 text-primary",
    value: "text-text-dark group-hover:text-primary",
    arrow: "text-primary/30 group-hover:text-primary",
  },
};

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 4h2.2c.5 0 .9.3 1 .8l.7 3.5a1 1 0 0 1-.3 1l-1.4 1.4a13 13 0 0 0 5.8 5.8l1.4-1.4a1 1 0 0 1 1-.3l3.5.7c.5.1.8.5.8 1V18.5a1.5 1.5 0 0 1-1.5 1.5C10.2 20 4 13.8 4 6.5A1.5 1.5 0 0 1 5.5 4Z"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h6M5 19l2.5-4H18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon,
  accent = "default",
  wide = false,
}: ContactCardProps) {
  const styles = accentStyles[accent];
  const content = (
    <>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          styles.icon,
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </p>
        <p className={cn("mt-0.5 text-base font-medium leading-6", styles.value)}>{value}</p>
      </div>
      {href && (
        <ArrowIcon
          className={cn(
            "hidden h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 sm:block",
            styles.arrow,
          )}
        />
      )}
    </>
  );

  const cardClassName = cn(
    "group flex items-center gap-4 rounded-md p-4 transition hover:shadow-md md:p-5",
    wide && "sm:col-span-2",
    styles.card,
    href && "focus-ring",
  );

  if (href) {
    return (
      <a
        href={href}
        className={cardClassName}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}

export async function ContactInfo({ className = "" }: ContactInfoProps) {
  const t = await getTranslations("footer");
  const phone = siteConfig.phone[0];
  const phoneHref = phone.replace(/\s/g, "");

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <ContactCard
        label={t("addressLabel")}
        value={siteConfig.address}
        icon={<LocationIcon className="h-5 w-5" />}
        wide
      />

      <ContactCard
        label={t("hotlineLabel")}
        value={siteConfig.phone.join(" · ")}
        href={`tel:${phoneHref}`}
        icon={<PhoneIcon className="h-5 w-5" />}
        accent="phone"
      />

      <ContactCard
        label="Zalo"
        value={siteConfig.zalo}
        href={`https://zalo.me/${siteConfig.zalo}`}
        icon={<ChatIcon className="h-5 w-5" />}
        accent="zalo"
      />

      <ContactCard
        label={t("emailLabel")}
        value={siteConfig.email}
        href={`mailto:${siteConfig.email}`}
        icon={<MailIcon className="h-5 w-5" />}
        wide
      />
    </div>
  );
}
