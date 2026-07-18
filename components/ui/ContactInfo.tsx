import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

type ContactInfoProps = {
  className?: string;
};

export async function ContactInfo({ className = "" }: ContactInfoProps) {
  const t = await getTranslations("footer");

  return (
    <div
      className={`rounded-xl bg-surface-muted p-8 shadow-sm ${className}`}
    >
      <ul className="space-y-4 text-base leading-7 text-text-muted">
        <li>
          <strong className="text-text-dark">{t("addressLabel")}:</strong> {siteConfig.address}
        </li>
        <li>
          <strong className="text-text-dark">{t("factoryLabel")}:</strong> {siteConfig.factory}
        </li>
        <li>
          <strong className="text-text-dark">{t("hotlineLabel")}:</strong>{" "}
          {siteConfig.phone.join(" - ")}
        </li>
        <li>
          <strong className="text-text-dark">{t("emailLabel")}:</strong>{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring rounded text-primary hover:underline"
          >
            {siteConfig.email}
          </a>
        </li>
        <li>
          <strong className="text-text-dark">Zalo:</strong> {siteConfig.zalo}
        </li>
      </ul>
    </div>
  );
}
