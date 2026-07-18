"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import type { NavItem } from "@/lib/data/navigation";

type MobileMenuProps = {
  items: NavItem[];
};

const mobileLinkClass =
  "focus-ring block rounded-md py-2 text-sm font-medium text-white transition hover:text-accent";

export function MobileMenu({ items }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring rounded-md border border-accent/30 px-3 py-2 text-white"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[80vh] overflow-y-auto border-t border-accent/20 bg-primary-dark shadow-xl">
          <ul className="px-4 py-4">
            {items.map((item) => {
              const hasChildren = Boolean(item.children?.length);

              if (hasChildren) {
                return (
                  <li key={item.key} className="border-b border-accent/15 py-2">
                    <button
                      type="button"
                      className={`${mobileLinkClass} flex w-full items-center justify-between`}
                      onClick={() =>
                        setExpanded(expanded === item.key ? null : item.key)
                      }
                    >
                      {t(item.key)}
                      <span>{expanded === item.key ? "▴" : "▾"}</span>
                    </button>
                    {expanded === item.key && (
                      <ul className="space-y-1 pb-2 pl-3">
                        {item.children?.map((child) =>
                          child.href ? (
                            <li key={child.key}>
                              <Link
                                href={child.href as "/"}
                                onClick={() => setOpen(false)}
                                className="focus-ring block rounded-md py-1.5 text-sm text-white/90 hover:text-accent"
                              >
                                {t(child.key)}
                              </Link>
                            </li>
                          ) : (
                            <li key={child.key}>
                              <p className="mb-1 text-sm font-semibold text-accent-soft">
                                {t(child.key)}
                              </p>
                              <ul className="space-y-1 pl-2">
                                {child.children?.map((sub) => (
                                  <li key={sub.key}>
                                    {sub.href ? (
                                      <Link
                                        href={sub.href as "/"}
                                        onClick={() => setOpen(false)}
                                        className="focus-ring block rounded-md py-1.5 text-sm text-white/90 hover:text-accent"
                                      >
                                        {t(sub.key)}
                                      </Link>
                                    ) : (
                                      <span className="block py-1.5 text-sm text-white/90">
                                        {t(sub.key)}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </li>
                );
              }

              if (item.href) {
                return (
                  <li key={item.key} className="border-b border-accent/15">
                    <Link
                      href={item.href as "/"}
                      onClick={() => setOpen(false)}
                      className={`${mobileLinkClass} py-3`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
