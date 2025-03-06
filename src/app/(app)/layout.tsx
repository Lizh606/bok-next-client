import { Providers } from "../../providers/providers"
import Footer from "../../ui/layout/footer"
import Header from "../../ui/layout/header"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Header></Header>
      <main className="relative z-[1] min-h-[calc(100vh-4.5rem)] pt-[4.5rem]">
        <Toaster position="bottom-right" />
        {children}
      </main>
      <Footer></Footer>
    </Providers>
  )
}
