import { isLocale, t, type Locale } from "@/lib/i18n";

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-semibold tracking-tight">{d.aboutTitle}</h1>

      {locale === "ko" ? (
        <>
          <p className="text-neutral-700 leading-8">
            <b>흔적은 결과물을 모으는 곳이 아니라, 선택을 기록하는 곳입니다.</b>
            <br />
            인공지능은 빠르게 문장을 생성합니다. 하지만 한 편의 글이 “내 것”이 되는 순간은 대개 다른 데서 발생합니다.
            지우는 문장, 고른 단어, 멈춘 지점, 공개하지 않기로 한 프롬프트—그 작은 결정들이 글의 정체성을 만듭니다.
          </p>
          <p className="text-neutral-700 leading-8">
            우리는 AI가 만든 텍스트를 저장하는 것이 아니라, 그 텍스트 안에 남은 <b>인간의 개입</b>을 함께 보관하고 싶었습니다.
          </p>
          <p className="text-neutral-600 leading-8">AI는 생성하고, 인간은 개입하며, 흔적은 남습니다.</p>
        </>
      ) : (
        <>
          <p className="text-neutral-700 leading-8">
            <b>TRACES is not a gallery of finished results. It’s an archive of decisions.</b>
            <br />
            AI can generate sentences fast, but authorship often appears elsewhere—in what gets removed, what gets kept, where the writer stops, and what remains unpublished.
          </p>
          <p className="text-neutral-700 leading-8">
            We wanted to keep not only AI-generated texts, but also the <b>human intervention</b> inside them.
          </p>
          <p className="text-neutral-600 leading-8">AI generates. Humans intervene. A trace remains.</p>
        </>
      )}
    </section>
  );
}
