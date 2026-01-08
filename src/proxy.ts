import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, locales } from "@/i18n/config"

const publicFile = /\.(.*)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next()
  }

  if (locales.some((locale) => pathname === `/${locale}`)) {
    return NextResponse.next()
  }

  if (locales.some((locale) => pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  const nextUrl = request.nextUrl.clone()
  nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(nextUrl)
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"]
}
