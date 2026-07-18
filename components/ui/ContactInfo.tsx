import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

type ContactInfoProps = {
  className?: string;
};

export async function ContactInfo({ className = "" }: ContactInfoProps) {
  const t = await getTranslations("footer");

  return (
    <div className={`rounded-lg border border-gray-200 bg-gray-50 p-8 ${className}`}>
      <ul className="space-y-4 text-gray-700">
        <li>
          <strong>{t("addressLabel")}:</strong> {siteConfig.address}
        </li>
        <li>
          <strong>{t("factoryLabel")}:</strong> {siteConfig.factory}
        </li>
        <li>
          <strong>{t("hotlineLabel")}:</strong> {siteConfig.phone.join(" - ")}
        </li>
        <li>
          <strong>{t("emailLabel")}:</strong>{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
            {siteConfig.email}
          </a>
        </li>
        <li>
          <strong>Zalo:</strong> {siteConfig.zalo}
        </li>
      </ul>
    </div>
  );
}
