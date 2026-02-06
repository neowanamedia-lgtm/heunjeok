import { isLocale, type Locale } from "@/lib/i18n";

export default function GuidePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;

  return (
    <section className="max-w-3xl mx-auto space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{locale === "ko" ? "사용 방법" : "How to Use"}</h1>
        <p className="text-neutral-600">
          {locale === "ko" ? "흔적은 “작성”이 아니라 “기록”을 중심에 둡니다." : "TRACES is built around records, not just posts."}
        </p>
      </header>

      {locale === "ko" ? (
        <>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1) 흔적 남기기</h2>
            <ul className="list-disc pl-6 text-neutral-700 leading-8">
              <li>제목과 본문을 입력합니다. (Markdown 가능)</li>
              <li>인간 개입도를 표시합니다. 0%는 AI 중심, 100%는 인간 중심.</li>
              <li>“가장 중요했던 선택”을 한 줄로 남깁니다.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2) 읽은 흔적 남기기</h2>
            <p className="text-neutral-700 leading-8">
              흔적에서 반응은 평가가 아니라 해석입니다. 인간이 느껴진 지점, 기계의 리듬이 강한 구간,
              이상해서 좋았던 이유를 남겨주세요.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3) 언어</h2>
            <p className="text-neutral-700 leading-8">
              상단의 언어 선택(한국어/English)으로 페이지 전체 언어가 바뀝니다.
              글은 원문을 기준으로 저장되고, 필요하다면 다른 언어 버전을 함께 작성해둘 수 있습니다.
              (UI에서는 ‘번역 기능’처럼 보이게 하지 않고, 언어별 버전으로만 보여줍니다.)
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1) Leave a Trace</h2>
            <ul className="list-disc pl-6 text-neutral-700 leading-8">
              <li>Write a title and body (Markdown supported).</li>
              <li>Set the Human Intervention Level (0% mostly AI, 100% mostly human).</li>
              <li>Answer: “What was the most important decision you made?”</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2) Leave a Reading</h2>
            <p className="text-neutral-700 leading-8">
              Responses are not ratings—they’re readings. Leave where the human voice surfaced, where the machine rhythm dominated,
              and what felt strange (and why it mattered).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3) Language</h2>
            <p className="text-neutral-700 leading-8">
              Use the language switch (Korean/English) to change the entire page language.
              Posts are stored with an original version, and you can optionally provide the other-language version.
              In the UI, this is presented simply as language-specific versions—not as a “translation feature.”
            </p>
          </div>
        </>
      )}
    </section>
  );
}
