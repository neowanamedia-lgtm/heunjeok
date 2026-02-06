"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "흔적",
  description: "인공지능이 쓴 글, 인간이 남긴 흔적."
};

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  return (
    <div className="min-h-screen px-6 py-10">
      <header className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href={`/${locale}`} className="text-sm text-neutral-600 hover:text-neutral-900">
          {d.brand}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href={`/${locale}/posts`} className="text-sm text-neutral-600 hover:text-neutral-900">
            {d.navPosts}
          </Link>
          <Link href={`/${locale}/about`} className="text-sm text-neutral-600 hover:text-neutral-900">
            {d.navAbout}
          </Link>
          <Link href={`/${locale}/guide`} className="text-sm text-neutral-600 hover:text-neutral-900">
            {d.navGuide}
          </Link>
          <LanguageSwitcher locale={locale} />
        </nav>
      </header>

      <main className="pt-10">{children}</main>

      <footer className="max-w-5xl mx-auto pt-16 text-xs text-neutral-400">
        © {new Date().getFullYear()} {d.brand}
      </footer>
    </div>
  );
}
