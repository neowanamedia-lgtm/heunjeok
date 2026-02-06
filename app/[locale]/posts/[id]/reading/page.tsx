"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { addReading, type Reading } from "@/lib/traceStore";

export default function ReadingPage({ params }: { params: { locale: string; id: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);
  const router = useRouter();

  const [text, setText] = useState("");
  const canSubmit = useMemo(() => text.trim().length > 0, [text]);

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{d.readingTitle}</h1>
        <p className="text-sm text-neutral-600">{d.readingSubtitle}</p>
      </header>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 border border-neutral-300 p-4 focus:outline-none rounded-2xl"
        placeholder={d.readingPlaceholder}
      />

      <div className="flex items-center gap-4">
        <button
          disabled={!canSubmit}
          className={`px-6 py-3 border rounded-full transition w-fit ${
            canSubmit ? "border-neutral-900 hover:bg-neutral-900 hover:text-white" : "border-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
          onClick={() => {
            const reading: Reading = {
              id: Date.now().toString(),
              postId: params.id,
              createdAt: new Date().toISOString(),
              locale,
              text: text.trim()
            };
            addReading(reading);
            router.push(`/${locale}/posts/${params.id}`);
          }}
        >
          {d.readingSubmit}
        </button>

        <Link href={`/${locale}/posts/${params.id}`} className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4">
          {d.backToPost}
        </Link>
      </div>
    </section>
  );
}
