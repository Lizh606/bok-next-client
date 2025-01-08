import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "文章"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="m-auto max-w-5xl">{children}</div>
}
