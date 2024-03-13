import type { PropsWithChildren } from "react"
import "./styles/globals.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
