import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `时光`
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="m-auto mt-8 max-w-3xl">{children}</div>
}
