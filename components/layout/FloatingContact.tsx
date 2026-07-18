import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

export async function FloatingContact() {
  const t = await getTranslations("floatingContact");
  const phone = siteConfig.phone[0].replace(/\s/g, "");

  return (
    <div className="fixed bottom-6 left-4 z-50 flex flex-col items-start gap-3">
      <a
        href={`https://zalo.me/${siteConfig.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("zalo")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-cta-zalo text-sm font-bold text-white shadow-lg transition hover:scale-105"
      >
        Zalo
      </a>
      <a
        href={`tel:${phone}`}
        aria-label={t("call")}
        className="flex items-center gap-2 rounded-full bg-cta-phone px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
      >
        <span aria-hidden>📞</span>
        {siteConfig.phone[0]}
      </a>
    </div>
  );
}
