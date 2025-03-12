"use client"

import { HeroUIProvider } from "@heroui/react"
import { ToastProvider } from "@heroui/toast"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" enableSystem={true}>
        <ToastProvider></ToastProvider>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
