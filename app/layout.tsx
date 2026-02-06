
import "./globals.css";

export const metadata = {
  title: "흔적",
  description: "흔적 — 지워진 뒤에도 남는 것. 조용한 기록을 위한 공간.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var KEY = "heunjeok-theme";
    var saved = localStorage.getItem(KEY);
    var theme = (saved === "light" || saved === "dark") ? saved : null;
    if (!theme) {
      var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      theme = prefersLight ? "light" : "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
