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
    title: dictionary.metadata.postsTitle
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="m-auto max-w-5xl">{children}</div>
}
