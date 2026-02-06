export type Locale = "ko" | "en";

export const LOCALES: Locale[] = ["ko", "en"];

export function isLocale(v: string): v is Locale {
  return (LOCALES as string[]).includes(v);
}

type Dict = Record<string, string>;

const ko: Dict = {
  brand: "흔적",
  brandSub: "TRACES",
  taglineKo: "인공지능이 쓴 글, 인간이 남긴 흔적.",
  taglineEn: "Written by AI. Marked by humans.",
  ctaWrite: "흔적 남기기",
  ctaBrowse: "최근 흔적 보기",
  navAbout: "소개",
  navGuide: "사용 방법",
  navPosts: "흔적",
  writeTitle: "흔적 남기기",
  writeSubtitle: "결과보다 선택을 기록합니다.",
  titlePlaceholder: "제목",
  bodyPlaceholder: "여기에 흔적을 남기세요 (Markdown 가능)",
  interventionLabel: "인간 개입도",
  choiceLabel: "이 글에서 가장 중요했던 선택은 무엇이었나요?",
  choicePlaceholder: "한 줄로 남겨주세요",
  otherLangSection: "다른 언어 버전 (선택)",
  otherLangHint: "영어로도 읽히게 하고 싶다면 여기서 영어 버전을 함께 적어두세요.",
  otherTitlePlaceholder: "(선택) 영어 제목",
  otherBodyPlaceholder: "(선택) 영어 본문",
  submit: "흔적 남기기",
  aboutTitle: "흔적에 대하여",
  guideTitle: "사용 방법",
  readingCta: "읽은 흔적 남기기",
  readingTitle: "읽은 흔적 남기기",
  readingSubtitle: "평가가 아니라 해석을 남겨주세요.",
  readingPlaceholder: "여기에 읽은 흔적을 남겨주세요",
  readingSubmit: "읽은 흔적 남기기",
  backToPost: "글로 돌아가기",
  readingsTitle: "읽은 흔적",
  postsTitle: "흔적",
  postsSubtitle: "최근에 남겨진 흔적들",
  emptyPosts: "아직 흔적이 없습니다. 첫 흔적을 남겨보세요.",
  openPost: "열어보기",
  missingLang: "이 언어 버전은 아직 준비되지 않았습니다. 원문을 표시합니다."
};

const en: Dict = {
  brand: "TRACES",
  brandSub: "흔적",
  taglineKo: "인공지능이 쓴 글, 인간이 남긴 흔적.",
  taglineEn: "Written by AI. Marked by humans.",
  ctaWrite: "Leave a Trace",
  ctaBrowse: "View Recent Traces",
  navAbout: "About",
  navGuide: "How to Use",
  navPosts: "Traces",
  writeTitle: "Leave a Trace",
  writeSubtitle: "Record choices, not just results.",
  titlePlaceholder: "Title",
  bodyPlaceholder: "Leave your trace here (Markdown supported)",
  interventionLabel: "Human Intervention Level",
  choiceLabel: "What was the most important decision you made?",
  choicePlaceholder: "Leave a single line",
  otherLangSection: "Other language version (optional)",
  otherLangHint: "If you want Korean readers too, add the Korean version here.",
  otherTitlePlaceholder: "(Optional) Korean title",
  otherBodyPlaceholder: "(Optional) Korean body",
  submit: "Leave a Trace",
  aboutTitle: "About TRACES",
  guideTitle: "How to Use",
  readingCta: "Leave a Reading",
  readingTitle: "Leave a Reading",
  readingSubtitle: "Leave an interpretation, not a rating.",
  readingPlaceholder: "Leave your reading here",
  readingSubmit: "Submit Reading",
  backToPost: "Back to post",
  readingsTitle: "Readings",
  postsTitle: "Traces",
  postsSubtitle: "Recently left traces",
  emptyPosts: "No traces yet. Leave the first one.",
  openPost: "Open",
  missingLang: "This language version isn’t available yet. Showing the original."
};

export function t(locale: Locale): Dict {
  return locale === "ko" ? ko : en;
}
