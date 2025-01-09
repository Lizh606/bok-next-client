"use client"

import * as lodash from "lodash"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"
import Morning from "../../public/svgs/太阳.svg"
import Night from "../../public/svgs/月亮.svg"
enum Themes {
  "DARK" = "dark",
  "LIGHT" = "light"
}

const debouncedChangeTheme = lodash.debounce((fn: () => void) => fn(), 200)

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // 简化 changeAnimation 函数
  const changeAnimation = useCallback(() => {
    const morningDom = document.getElementsByClassName(
      "morning"
    )[0] as HTMLElement
    const nightDom = document.getElementsByClassName("night")[0] as HTMLElement
    const ANIMATION_CLASSES = ["-translate-y-full", "opacity-0"]

    if (theme === Themes.LIGHT) {
      nightDom.classList.add(...ANIMATION_CLASSES)
      morningDom.classList.remove(...ANIMATION_CLASSES)
    } else {
      nightDom.classList.remove(...ANIMATION_CLASSES)
      morningDom.classList.add(...ANIMATION_CLASSES)
    }
  }, [theme])

  const changeTheme = () => {
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
    changeAnimation()
  }
  const callbackRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref) return
      changeAnimation()
    },
    [changeAnimation]
  )
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-2">
      <div
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-solid bg-gradient-to-b from-orange-400 to-yellow-400 p-2 dark:from-[#39598a] dark:to-[#79d7ed]"
        onClick={() => debouncedChangeTheme(changeTheme)}
      >
        <div
          ref={callbackRef}
          className="morning absolute h-6 w-6 transform duration-1000 ease-in-out"
        >
          <Morning className="h-full w-full"></Morning>
        </div>
        <div className="night absolute h-6 w-6 transform duration-1000 ease-in-out">
          <Night className="h-full w-full"></Night>
        </div>
      </div>
    </div>
  )
}
