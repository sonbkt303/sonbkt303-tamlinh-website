import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { newsItems } from "@/lib/data/news";

export async function Footer() {
  const t = await getTranslations("footer");
  const latestNews = newsItems.slice(0, 3);

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 lg:px-6">
        <div>
          <h2 className="mb-4 text-lg font-bold uppercase text-accent">
            {t("aboutTitle")}
          </h2>
          <p className="text-sm leading-relaxed text-white/90">{t("aboutText")}</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold uppercase text-accent">
            {t("contactTitle")}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-white/90">
            <li>
              <strong>{t("addressLabel")}:</strong> {siteConfig.address}
            </li>
            <li>
              <strong>{t("factoryLabel")}:</strong> {siteConfig.factory}
            </li>
            <li>
              <strong>{t("hotlineLabel")}:</strong>{" "}
              {siteConfig.phone.join(" - ")}
            </li>
            <li>
              <strong>{t("emailLabel")}:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold uppercase text-accent">
            {t("newsTitle")}
          </h2>
          <ul className="space-y-3">
            {latestNews.map((item) => (
              <li key={item.slug}>
                <Link
                  href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }}
                  className="text-sm text-white/90 transition hover:text-accent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/70">
        {t("copyright")}
      </div>
    </footer>
  );
}
