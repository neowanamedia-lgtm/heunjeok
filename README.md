# 흔적 / TRACES — i18n MVP

한국어/영어가 한 페이지에서 섞이지 않도록 **로케일 라우팅**으로 분리했습니다.

## URL
- /ko, /ko/write, /ko/about, /ko/guide
- /en, /en/write, /en/about, /en/guide

## 실행 (로컬)
Node.js 18+

```bash
npm install
npm run dev
```

http://localhost:3000 로 접속하면 자동으로 /ko 또는 /en 으로 이동합니다.

## 언어 전환
상단 우측의 KO | EN 버튼으로 **현재 페이지 경로를 유지한 채** 전체 언어를 전환합니다.
