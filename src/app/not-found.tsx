"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { defaultLocale, isLocale } from "@/i18n/config"
import { getClientDictionary } from "@/i18n/client"

export default function NotFound() {
  const pathName = usePathname()
  const segments = pathName.split("/").filter(Boolean)
  const locale = isLocale(segments[0] ?? "") ? segments[0] : defaultLocale
  const dictionary = getClientDictionary(locale)
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 relative">
      <h2 className="text-xl font-semibold">{dictionary.notFound.title}</h2>
      <Link
        href={`/${locale}`}
        className="mt-4 rounded-md bg-primary-300 text-white px-4 py-2 text-sm transition-colors "
      >
        {dictionary.notFound.backHome}
      </Link>
    </main>
  )
}
