import BackToTop from "@/components/BackToTop"
import "@/styles/globals.css"
import { Metadata } from "next"
import type React from "react"

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
        className={`relative lxg h-full m-0 p-0 overflow-x-hidden overflow-y-auto text-default-700`}
      >
        <>{children}</>
        <div className="fixed right-4 bottom-44 z-20">
          <BackToTop></BackToTop>
        </div>
      </body>
    </html>
  )
}
