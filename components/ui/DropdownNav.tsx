"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import type { NavItem } from "@/lib/data/navigation";

type DropdownNavProps = {
  items: NavItem[];
};

const navLinkClass =
  "focus-ring block whitespace-nowrap rounded-md px-3 py-3 text-sm font-medium text-white transition hover:text-accent";

export function DropdownNav({ items }: DropdownNavProps) {
  const t = useTranslations("nav");
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <ul className="hidden items-center gap-0.5 xl:flex">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const label = t(item.key);

        if (hasChildren) {
          return (
            <li
              key={item.key}
              className="relative"
              onMouseEnter={() => setOpenKey(item.key)}
              onMouseLeave={() => setOpenKey(null)}
            >
              <button
                type="button"
                className={`${navLinkClass} flex items-center gap-1`}
              >
                {label}
                <span aria-hidden>▾</span>
              </button>
              {openKey === item.key && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-lg border border-accent/20 bg-primary-dark py-2 shadow-xl">
                  <ul className="space-y-1 px-2">
                    {item.children?.map((child) => (
                      <li key={child.key}>
                        {child.href ? (
                          <Link
                            href={child.href as "/"}
                            className="focus-ring block whitespace-nowrap rounded-md px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 hover:text-accent"
                          >
                            {t(child.key)}
                          </Link>
                        ) : (
                          <div className="px-3 py-2">
                            <p className="mb-2 text-sm font-semibold text-accent-soft">
                              {t(child.key)}
                            </p>
                            <ul className="space-y-1">
                              {child.children?.map((sub) => (
                                <li key={sub.key}>
                                  {sub.href ? (
                                    <Link
                                      href={sub.href as "/"}
                                      className="focus-ring block rounded-md py-1.5 pl-2 text-sm text-white/90 transition hover:bg-white/10 hover:text-accent"
                                    >
                                      {t(sub.key)}
                                    </Link>
                                  ) : (
                                    <span className="block py-1.5 pl-2 text-sm text-white/90">
                                      {t(sub.key)}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        }

        if (item.href) {
          return (
            <li key={item.key}>
              <Link
                href={item.href as "/"}
                {...(item.anchor
                  ? {
                      onClick: () => {
                        const el = document.getElementById(item.anchor!);
                        el?.scrollIntoView({ behavior: "smooth" });
                      },
                    }
                  : {})}
                className={navLinkClass}
              >
                {label}
              </Link>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
