"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import type { NavItem } from "@/lib/data/navigation";

type DropdownNavProps = {
  items: NavItem[];
};

export function DropdownNav({ items }: DropdownNavProps) {
  const t = useTranslations("nav");
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <ul className="hidden items-center gap-1 xl:flex">
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
                className="flex items-center gap-1 px-2 py-4 text-xs font-semibold uppercase tracking-wide text-white transition hover:text-accent"
              >
                {label}
                <span aria-hidden>▾</span>
              </button>
              {openKey === item.key && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] border border-white/10 bg-primary-dark py-2 shadow-xl">
                  {item.children?.map((child) => (
                    <div key={child.key} className="px-4 py-2">
                      <p className="mb-2 text-xs font-bold uppercase text-accent">
                        {t(child.key)}
                      </p>
                      <ul className="space-y-1">
                        {child.children?.map((sub) => (
                          <li key={sub.key}>
                            {sub.href ? (
                              <Link
                                href={sub.href as "/"}
                                className="block py-1 text-sm text-white/90 transition hover:text-accent"
                              >
                                {t(sub.key)}
                              </Link>
                            ) : (
                              <span className="block py-1 text-sm text-white/90">
                                {t(sub.key)}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
                  ? { onClick: () => {
                      const el = document.getElementById(item.anchor!);
                      el?.scrollIntoView({ behavior: "smooth" });
                    } }
                  : {})}
                className="block px-2 py-4 text-xs font-semibold uppercase tracking-wide text-white transition hover:text-accent"
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
