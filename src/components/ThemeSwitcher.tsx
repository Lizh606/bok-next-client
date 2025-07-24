"use client"

import { Tooltip } from "@heroui/react"
import * as lodash from "lodash"
import { useCallback } from "react"
import Morning from "../../public/svgs/太阳.svg"
import Night from "../../public/svgs/月亮.svg"
import { useAppTheme } from "../hooks/useAppTheme"

const debouncedChangeTheme = lodash.debounce((fn: () => void) => fn(), 200)

export function ThemeSwitcher() {
  const { currentTheme, toggleTheme, mounted, Themes } = useAppTheme()

  const changeAnimation = useCallback(() => {
    const morningDom = document.getElementsByClassName(
      "morning"
    )[0] as HTMLElement
    const nightDom = document.getElementsByClassName("night")[0] as HTMLElement
    const ANIMATION_CLASSES = [
      "-translate-y-full",
      "opacity-0",
      "rotate-90",
      "scale-75"
    ]

    if (currentTheme === Themes.LIGHT) {
      nightDom.classList.add(...ANIMATION_CLASSES)
      morningDom.classList.remove(...ANIMATION_CLASSES)
      morningDom.classList.add("rotate-0", "scale-100")
      setTimeout(() => morningDom.classList.remove("rotate-0"), 500)
    } else {
      nightDom.classList.remove(...ANIMATION_CLASSES)
      nightDom.classList.add("rotate-0", "scale-100")
      morningDom.classList.add(...ANIMATION_CLASSES)
      setTimeout(() => nightDom.classList.remove("rotate-0"), 500)
    }
  }, [currentTheme, Themes])

  const changeTheme = () => {
    toggleTheme()
    changeAnimation()
  }
  const callbackRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref) return
      changeAnimation()
    },
    [changeAnimation]
  )

  if (!mounted) return null

  return (
    <Tooltip
      content={currentTheme === Themes.LIGHT ? "切换夜间模式" : "切换白天模式"}
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
