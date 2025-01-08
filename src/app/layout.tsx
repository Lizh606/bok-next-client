import BackToTop from "@/components/BackToTop"
import "@/styles/globals.css"
import { Metadata } from "next"
import localFont from "next/font/local"
import type React from "react"
const myFont = localFont({
  src: "../../public/fonts/LXGWWenKaiMonoScreen.ttf"
})
export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_BOK_NAME}`,
    default: process.env.NEXT_PUBLIC_BOK_NAME as string
  },
  description: process.env.NEXT_PUBLIC_BOK_NAME
}
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${myFont.className} relative m-0 h-full overflow-y-auto overflow-x-hidden p-0 text-default-700`}
      >
        <>{children}</>
        <div className="fixed bottom-44 right-4 z-20">
          <BackToTop></BackToTop>
        </div>
      </body>
    </html>
  )
}
