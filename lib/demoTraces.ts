import type { Trace } from "@/lib/traceStore";

export const DEMO_TRACES: Trace[] = [
  {
    id: "1",
    createdAt: "2026-02-06T00:00:00.000Z",
    author: "anonymous",
    intervention: 65,
    choice: "멈추는 지점을 선택했다.",
    originalLocale: "ko",
    titleKo: "샘플 글 제목",
    bodyKo:
      "이 문장은 인공지능이 먼저 시작했고, 인간은 멈추는 지점을 선택했다.\n\n우리는 결과보다 개입을 기록한다. 문장 사이에 남는 것은 언제나 선택이다.",
    titleEn: "Sample Post Title",
    bodyEn:
      "This sentence started with a machine, and a human chose where to stop.\n\nWe record intervention, not just outcomes. What remains between lines is always a decision."
  }
];
