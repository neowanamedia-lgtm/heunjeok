import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "@/lib/i18n";

function detectLocale(req: NextRequest) {
  const al = req.headers.get("accept-language") || "";
  const lowered = al.toLowerCase();
  if (lowered.startsWith("en") || lowered.includes(",en")) return "en";
  return "ko";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
