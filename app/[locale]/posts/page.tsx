"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { DEMO_TRACES } from "@/lib/demoTraces";
import { getTraces, pickTitle, seedIfEmpty, type Trace } from "@/lib/traceStore";

export default function PostsPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  const [traces, setTraces] = useState<Trace[]>([]);

  useEffect(() => {
    seedIfEmpty(DEMO_TRACES);
    setTraces(getTraces());
  }, []);

  const header = useMemo(() => ({
    title: d.postsTitle,
    subtitle: d.postsSubtitle
  }), [d.postsTitle, d.postsSubtitle]);

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{header.title}</h1>
        <p className="text-sm text-neutral-600">{header.subtitle}</p>
      </header>

      {traces.length === 0 ? (
        <div className="rounded-3xl border bg-white p-6 text-sm text-neutral-600">{d.emptyPosts}</div>
      ) : (
        <ul className="space-y-3">
          {traces.map((tr) => {
            const { title, missing } = pickTitle(tr, locale);
            return (
              <li key={tr.id} className="rounded-3xl border bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-lg font-medium leading-snug">{title}</p>
                    <p className="text-xs text-neutral-500">by {tr.author} · {new Date(tr.createdAt).toISOString().slice(0, 10)}</p>
                    {missing ? (
                      <p className="text-xs text-neutral-500">{d.missingLang}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/${locale}/posts/${tr.id}`}
                    className="text-sm text-neutral-700 hover:text-neutral-900 underline underline-offset-4 shrink-0"
                  >
                    {d.openPost}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
