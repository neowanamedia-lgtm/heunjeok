import dynamic from "next/dynamic";

const ThemeSwitchClient = dynamic(() => import("./ThemeSwitchClient"), { ssr: false });

export function ThemeSwitch() {
  return <ThemeSwitchClient />;
}

export default ThemeSwitch;
