import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["ko", "en"] as const;

function detectLocale(req: NextRequest) {
  const accept = req.headers.get("accept-language") || "";
  if (accept.toLowerCase().includes("ko")) return "ko";
  return "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|.*\..*).*)"] };
