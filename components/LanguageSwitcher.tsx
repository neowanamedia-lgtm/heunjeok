import dynamic from "next/dynamic";

const LanguageSwitcherClient = dynamic(() => import("./LanguageSwitcherClient"), { ssr: false });

export default function LanguageSwitcher() {
  return <LanguageSwitcherClient />;
}
