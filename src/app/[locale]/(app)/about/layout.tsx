import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return {
    title: dictionary.metadata.aboutTitle
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="max-w-5xl m-auto mt-8">{children}</div>
}
