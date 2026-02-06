import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitch from "@/components/LocaleSwitch";

export default function Header({ locale }: { locale: "ko" | "en" }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between px-5 py-5">
        <Link href={`/${locale}`} className="inline-flex items-baseline gap-2 select-none">
          <strong className="text-[15px] font-[680] tracking-[0.14em] uppercase">흔적</strong>
          <span className="hidden text-xs text-[color:var(--muted)] sm:inline">record of what remains</span>
        </Link>
        <div className="flex items-center gap-3">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
