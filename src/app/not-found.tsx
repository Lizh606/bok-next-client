"use client"
import { getClientDictionary } from "@/i18n/client"
import { defaultLocale, isLocale, type Locale } from "@/i18n/config"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathName = usePathname()
  const segments = pathName.split("/").filter(Boolean)
  const localeSegment = segments[0] ?? ""
  const locale = isLocale(localeSegment)
    ? (localeSegment as Locale)
    : defaultLocale
  const dictionary = getClientDictionary(locale)
  return (
    <main className="relative flex h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">{dictionary.notFound.title}</h2>
      <Link
        href={`/${locale}`}
        className="mt-4 rounded-md bg-primary-300 px-4 py-2 text-sm text-white transition-colors"
      >
        {dictionary.notFound.backHome}
      </Link>
    </main>
  )
}
