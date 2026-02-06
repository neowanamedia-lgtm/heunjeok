import dynamic from "next/dynamic";

const LanguageSwitcherClient = dynamic(() => import("./LanguageSwitcherClient"), { ssr: false });

export function LanguageSwitcher() {
  return <LanguageSwitcherClient />;
}

export default LanguageSwitcher;
