import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

enum Themes {
  "DARK" = "dark",
  "LIGHT" = "light"
}

export function useAppTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const currentTheme =
    typeof window !== "undefined"
      ? theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme
      : undefined

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
    setMounted(true)
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
