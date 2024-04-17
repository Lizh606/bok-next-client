import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "归档",
  description: "XiaoHang的博客"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="max-w-5xl m-auto mt-8">{children}</div>
}
