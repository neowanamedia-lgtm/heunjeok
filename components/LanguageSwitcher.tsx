import ThemeSwitch from "@/components/ThemeSwitch";

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale, LOCALES } from "@/lib/i18n";

function swapLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}`;
  if (LOCALES.includes(parts[0] as Locale)) {
    parts[0] = nextLocale;
    return "/" + parts.join("/");
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const koHref = swapLocale(pathname, "ko");
  const enHref = swapLocale(pathname, "en");

  <ThemeSwitch />

  return (
    <div className="text-sm text-neutral-600 flex items-center gap-2">
      <Link className={locale === "ko" ? "text-neutral-900" : "hover:text-neutral-900"} href={koHref}>
        KO
      </Link>
      <span className="text-neutral-300">|</span>
      <Link className={locale === "en" ? "text-neutral-900" : "hover:text-neutral-900"} href={enHref}>
        EN
      </Link>
    </div>
  );
}
