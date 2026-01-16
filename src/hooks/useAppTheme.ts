"use client"

import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

enum Themes {
  "DARK" = "dark",
  "LIGHT" = "light"
}

export function useAppTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  const currentTheme = mounted ? resolvedTheme : undefined

  const toggleTheme = useCallback(() => {
    switch (theme) {
      case Themes.DARK:
        setTheme(Themes.LIGHT)
        break
      case Themes.LIGHT:
        setTheme(Themes.DARK)
        break
      default:
        setTheme(Themes.LIGHT)
    }
  }, [theme, setTheme])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return {
    theme,
    currentTheme,
    isLight: currentTheme === Themes.LIGHT,
    isDark: currentTheme === Themes.DARK,
    setTheme,
    toggleTheme,
    mounted,
    Themes
  }
}
