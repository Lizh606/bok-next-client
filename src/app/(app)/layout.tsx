import type { Metadata } from "next"
import Footer from "../../ui/layout/footer"
import Header from "../../ui/layout/header"

import { Providers } from "../../providers/providers"

export const metadata: Metadata = {
  title: "XiaoHang-bok",
  description: "XiaoHang的博客"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`lxg h-full m-0 p-0 overflow-x-hidden overflow-y-auto text-default-900`}
      >
        <Providers>
          <Header></Header>
          <main className="relative z-[1] pt-[4.5rem] min-h-[calc(100vh-4.5rem)] ">
            {children}
          </main>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  )
}
