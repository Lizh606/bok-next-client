import type { Metadata } from "next"
import Footer from "../components/Footer"
import Header from "../components/Header"

import { Providers } from "../providers/providers"

export const metadata: Metadata = {
  title: "ZeHang-bok",
  description: "ZeHang的博客前端"
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
          <main className="relative z-[1] px-6 pt-[4.5rem] min-h-[calc(100vh-4.5rem)] ">
            {children}
          </main>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  )
}
