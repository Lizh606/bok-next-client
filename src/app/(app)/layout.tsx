import Footer from "../../ui/layout/footer"
import Header from "../../ui/layout/header"

import BackToTop from "@/components/BackToTop"
import { Toaster } from "react-hot-toast"
import { Providers } from "../../providers/providers"
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Header></Header>
      <main className="relative z-[1] pt-[4.5rem] min-h-[calc(100vh-4.5rem)] ">
        <Toaster position="bottom-right" />
        {children}
        <div className="absolute right-4 bottom-4">
          <BackToTop></BackToTop>
        </div>
      </main>
      <Footer></Footer>
    </Providers>
  )
}
