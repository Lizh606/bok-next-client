import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "归档",
  description: "Hangg的博客前端"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
