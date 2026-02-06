"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InterventionBar } from "@/components/InterventionBar";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { DEMO_TRACES } from "@/lib/demoTraces";
import { addTrace, seedIfEmpty, type Trace } from "@/lib/traceStore";

export default function WritePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [intervention, setIntervention] = useState(50);
  const [choice, setChoice] = useState("");

  // Optional other-language version (not presented as a "translation feature")
  const [otherTitle, setOtherTitle] = useState("");
  const [otherBody, setOtherBody] = useState("");

  const canSubmit = useMemo(() => title.trim().length > 0 && body.trim().length > 0, [title, body]);

  const interventionLabel =
    intervention < 30
      ? (locale === "ko" ? "AI가 대부분을 차지한 흔적" : "Mostly AI-generated")
      : intervention < 70
      ? (locale === "ko" ? "공동 작업의 흔적" : "Co-written trace")
      : (locale === "ko" ? "인간의 선택이 강한 흔적" : "Strong human intervention");

  return (
    <section className="max-w-3xl mx-auto space-y-10">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold">{d.writeTitle}</h2>
        <p className="text-sm text-neutral-600">{d.writeSubtitle}</p>
      </header>

      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={d.titlePlaceholder}
          className="w-full text-xl border-b border-neutral-300 focus:outline-none py-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={d.bodyPlaceholder}
          className="w-full h-64 border border-neutral-300 p-4 focus:outline-none rounded-2xl"
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm text-neutral-600">{d.interventionLabel}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={intervention}
          onChange={(e) => setIntervention(Number(e.target.value))}
          className="w-full"
        />
        <InterventionBar value={intervention} label={interventionLabel} />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-neutral-600">{d.choiceLabel}</label>
        <input
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="w-full border-b border-neutral-300 focus:outline-none py-2"
          placeholder={d.choicePlaceholder}
        />
      </div>

      <details className="rounded-3xl border bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium text-neutral-800">{d.otherLangSection}</summary>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{d.otherLangHint}</p>
        <div className="mt-4 space-y-4">
          <input
            value={otherTitle}
            onChange={(e) => setOtherTitle(e.target.value)}
            placeholder={d.otherTitlePlaceholder}
            className="w-full text-base border-b border-neutral-300 focus:outline-none py-2"
          />
          <textarea
            value={otherBody}
            onChange={(e) => setOtherBody(e.target.value)}
            placeholder={d.otherBodyPlaceholder}
            className="w-full h-40 border border-neutral-300 p-4 focus:outline-none rounded-2xl"
          />
        </div>
      </details>

      <button
        disabled={!canSubmit}
        className={`px-6 py-3 border rounded-full transition w-fit ${
          canSubmit ? "border-neutral-900 hover:bg-neutral-900 hover:text-white" : "border-neutral-200 text-neutral-400 cursor-not-allowed"
        }`}
        onClick={() => {
          seedIfEmpty(DEMO_TRACES);
          const id = Date.now().toString();
          const trace: Trace = {
            id,
            createdAt: new Date().toISOString(),
            author: "anonymous",
            intervention,
            choice,
            originalLocale: locale,
            ...(locale === "ko"
              ? {
                  titleKo: title,
                  bodyKo: body,
                  titleEn: otherTitle.trim() ? otherTitle : undefined,
                  bodyEn: otherBody.trim() ? otherBody : undefined
                }
              : {
                  titleEn: title,
                  bodyEn: body,
                  titleKo: otherTitle.trim() ? otherTitle : undefined,
                  bodyKo: otherBody.trim() ? otherBody : undefined
                })
          };
          addTrace(trace);
          router.push(`/${locale}/posts/${id}`);
        }}
      >
        {d.submit}
      </button>
    </section>
  );
}
