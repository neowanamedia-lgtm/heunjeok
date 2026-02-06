"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale, LOCALES } from "@/lib/i18n";

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  if (parts.length >= 2 && LOCALES.includes(parts[1] as Locale)) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export default function LanguageSwitcherClient() {
  const pathname = usePathname() || "/";

  const current = (pathname.split("/")[1] as Locale) || "ko";
  const currentLocale: Locale = LOCALES.includes(current) ? current : "ko";
  const otherLocale: Locale = currentLocale === "ko" ? "en" : "ko";

  const hrefOther = replaceLocaleInPath(pathname, otherLocale);

  return (
    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>{currentLocale.toUpperCase()}</span>
      <span style={{ fontSize: 12, opacity: 0.4 }}>|</span>
      <Link
        href={hrefOther}
        style={{
          fontSize: 12,
          textDecoration: "none",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "6px 10px",
          lineHeight: 1,
          color: "inherit",
        }}
      >
        {otherLocale.toUpperCase()}
      </Link>
    </div>
  );
}
