"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function Write({ params }: { params: { locale: "ko" | "en" } }) {
  const isKo = params.locale !== "en";
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen">
      <Header locale={params.locale} />
      <main className="mx-auto w-full max-w-[980px] px-5 py-14">
        <div className="text-xs tracking-[0.22em] uppercase text-[color:var(--muted)]">write</div>
        <h1 className="mt-4 text-3xl font-[740]">{isKo ? "흔적 남기기" : "Write a trace"}</h1>

        <div className="mt-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isKo ? "짧게 남겨도 괜찮아요." : "Short is fine."}
            className="w-full min-h-[180px] rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] p-4 text-base leading-[1.8] text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
          />
          <div className="mt-3 text-xs text-[color:var(--muted)]">
            {isKo ? "※ 저장 기능은 아직 연결되지 않았어요. (UI만 있는 상태)" : "※ Save is not wired yet. (UI only)"}
          </div>
        </div>
      </main>
    </div>
  );
}
