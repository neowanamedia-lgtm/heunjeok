import dynamic from "next/dynamic";

const ThemeSwitchClient = dynamic(() => import("./ThemeSwitchClient"), { ssr: false });

export default function ThemeSwitch() {
  return <ThemeSwitchClient />;
}
