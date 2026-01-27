import type React from "react"
import { locales, isLocale } from "@/i18n/config"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const resolvedParams = await params
  const locale = resolvedParams.locale?.toLowerCase?.() ?? ""
  if (!isLocale(locale)) {
    notFound()
  }

  return <>{children}</>
}
