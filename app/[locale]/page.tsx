import Header from "@/components/Header";

export default function Page({ params }: { params: { locale: "ko" | "en" } }) {
  const isKo = params.locale !== "en";
  return (
    <div className="min-h-screen">
      <Header locale={params.locale} />
      <main className="mx-auto w-full max-w-[980px] px-5 py-14">
        <div className="text-xs tracking-[0.22em] uppercase text-[color:var(--muted)]">a quiet archive</div>
        <h1 className="mt-4 text-[clamp(30px,4vw,52px)] font-[740] leading-[1.08]">
          {isKo ? "지워진 뒤에도 남는 것." : "What remains, even after erased."}
        </h1>
        <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.8] text-[color:var(--muted)]">
          {isKo ? "흔적은 기록을 과시하지 않습니다. 남겨진 결만 조용히 보관합니다." : "Traces don’t show off. They keep only what remains."}
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          <a className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--text)_10%,transparent)] px-4 py-3 text-sm"
             href={`/${params.locale}/write`}>{isKo ? "흔적 남기기" : "Write a trace"}</a>
          <a className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] px-4 py-3 text-sm"
             href={`/${params.locale}/guide`}>{isKo ? "가이드" : "Guide"}</a>
          <a className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] px-4 py-3 text-sm"
             href={`/${params.locale}/about`}>{isKo ? "소개" : "About"}</a>
        </div>
      </main>
    </div>
  );
}
