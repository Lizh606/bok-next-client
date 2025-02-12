"use client"

import * as lodash from "lodash"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"
import Morning from "../../public/svgs/太阳.svg"
import Night from "../../public/svgs/月亮.svg"
import { Tooltip } from "@heroui/react"
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
    <Tooltip
      content={theme === Themes.LIGHT ? "切换夜间模式" : "切换白天模式"}
      placement="bottom"
    >
      <div className="relative p-1.5">
        <div
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-gradient-to-b from-orange-300 to-yellow-300 p-1.5 shadow-sm transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md dark:from-[#1e293b] dark:to-[#334155]"
          onClick={() => debouncedChangeTheme(changeTheme)}
        >
          <div
            ref={callbackRef}
            className="morning absolute h-5 w-5 transform duration-500 ease-in-out"
          >
            <Morning className="h-full w-full text-orange-600"></Morning>
          </div>
          <div className="night absolute h-5 w-5 transform duration-500 ease-in-out">
            <Night className="h-full w-full text-slate-100"></Night>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
