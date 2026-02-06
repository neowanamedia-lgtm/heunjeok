"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "heunjeok-theme";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia?.("(prefers-color-scheme: light)")?.matches
          ? "light"
          : "dark";

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  };

  const isLight = theme === "light";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] px-2 py-1">
      <button
        type="button"
        aria-pressed={isLight}
        onClick={() => applyTheme("light")}
        className={[
          "rounded-full px-2.5 py-1 text-[11px] tracking-[0.16em] uppercase",
          "text-[color:var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]",
          isLight ? "bg-[color:color-mix(in_srgb,var(--text)_12%,transparent)] text-[color:var(--text)]" : "",
        ].join(" ")}
      >
        Day
      </button>

      <button
        type="button"
        aria-pressed={!isLight}
        onClick={() => applyTheme("dark")}
        className={[
          "rounded-full px-2.5 py-1 text-[11px] tracking-[0.16em] uppercase",
          "text-[color:var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]",
          !isLight ? "bg-[color:color-mix(in_srgb,var(--text)_12%,transparent)] text-[color:var(--text)]" : "",
        ].join(" ")}
      >
        Night
      </button>
    </div>
  );
}
