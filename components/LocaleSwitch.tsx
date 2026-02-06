"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleSwitch() {
  const pathname = usePathname() || "/ko";
  const parts = pathname.split("/").filter(Boolean);
  const current = parts[0] === "en" ? "en" : "ko";
  const rest = parts.slice(1).join("/");
  const toKo = "/ko" + (rest ? `/${rest}` : "");
  const toEn = "/en" + (rest ? `/${rest}` : "");

  return (
    <div className="inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-[color:var(--muted)]">
      <Link href={toKo} className={current === "ko" ? "text-[color:var(--text)]" : ""}>KO</Link>
      <span className="opacity-50">|</span>
      <Link href={toEn} className={current === "en" ? "text-[color:var(--text)]" : ""}>EN</Link>
    </div>
  );
}
