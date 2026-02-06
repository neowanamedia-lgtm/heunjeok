"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { InterventionBar } from "@/components/InterventionBar";
import { DEMO_TRACES } from "@/lib/demoTraces";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { getTrace, getReadings, pickBody, pickTitle, seedIfEmpty, type Reading, type Trace } from "@/lib/traceStore";

export default function PostDetail({ params }: { params: { locale: string; id: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  const [trace, setTrace] = useState<Trace | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    seedIfEmpty(DEMO_TRACES);
    const t0 = getTrace(params.id);
    setTrace(t0);
    setReadings(getReadings(params.id));
  }, [params.id]);

  const interventionLabel = useMemo(() => {
    const v = trace?.intervention ?? 50;
    return v < 30
      ? locale === "ko"
        ? "AI가 대부분을 차지한 흔적"
        : "Mostly AI-generated"
      : v < 70
      ? locale === "ko"
        ? "공동 작업의 흔적"
        : "Co-written trace"
      : locale === "ko"
      ? "인간의 선택이 강한 흔적"
      : "Strong human intervention";
  }, [locale, trace?.intervention]);

  if (!trace) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="rounded-3xl border bg-white p-6 text-sm text-neutral-600">
          {locale === "ko" ? "글을 찾을 수 없습니다." : "Post not found."}
        </div>
      </section>
    );
  }

  const { title, missing: missingTitle } = pickTitle(trace, locale);
  const { body, missing: missingBody } = pickBody(trace, locale);
  const missingLang = missingTitle || missingBody;

  return (
    <article className="max-w-3xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-500">by {trace.author} · {new Date(trace.createdAt).toISOString().slice(0, 10)}</p>
        {missingLang ? <p className="text-sm text-neutral-600">{d.missingLang}</p> : null}
      </header>

      <section className="prose prose-neutral max-w-none whitespace-pre-wrap">
        {body}
      </section>

      <aside className="space-y-4 pt-10 border-t">
        <h3 className="text-sm font-medium text-neutral-700">{locale === "ko" ? "흔적 정보" : "Trace Data"}</h3>
        <InterventionBar value={trace.intervention} label={interventionLabel} />
        <p className="text-sm text-neutral-600">{locale === "ko" ? "모델: GPT" : "Model: GPT"}</p>
        <p className="text-sm text-neutral-600">{locale === "ko" ? "프롬프트: 일부 공개" : "Prompt: Partially visible"}</p>
        {trace.choice?.trim() ? (
          <p className="text-sm text-neutral-700">
            <span className="text-neutral-500">{locale === "ko" ? "중요한 선택" : "Key decision"}:</span> {trace.choice}
          </p>
        ) : null}
      </aside>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-neutral-700">{d.readingsTitle}</h3>
          <Link href={`/${locale}/posts/${params.id}/reading`} className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4">
            {d.readingCta}
          </Link>
        </div>

        {readings.length === 0 ? (
          <p className="text-sm text-neutral-600">{locale === "ko" ? "아직 읽은 흔적이 없습니다." : "No readings yet."}</p>
        ) : (
          <ul className="space-y-2">
            {readings.slice(0, 5).map((r) => (
              <li key={r.id} className="rounded-3xl border bg-white p-4">
                <p className="text-xs text-neutral-500">{new Date(r.createdAt).toISOString().slice(0, 10)} · {r.locale.toUpperCase()}</p>
                <p className="mt-2 text-sm text-neutral-800 whitespace-pre-wrap">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
