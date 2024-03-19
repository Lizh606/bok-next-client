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
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const changeAnimation = useCallback(() => {
    const morningDom = document.getElementsByClassName(
      "morning"
    )[0] as HTMLElement
    const nightDom = document.getElementsByClassName("night")[0] as HTMLElement
    const animationStringArr = ["-translate-y-full", "opacity-0"]
    const addClasses = (element: HTMLElement, classes: string[]) => {
      element.classList.add(...classes)
    }

    const removeClasses = (element: HTMLElement, classes: string[]) => {
      element.classList.remove(...classes)
    }
    switch (theme) {
      case Themes.LIGHT:
        addClasses(nightDom, animationStringArr)
        removeClasses(morningDom, animationStringArr)
        break
      case Themes.DARK:
        removeClasses(nightDom, animationStringArr)
        addClasses(morningDom, animationStringArr)
        break
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
    (ref: any) => {
      // 并且卸载组件时，会再次传入null调用该函数，会引发报错
      // 所以：遇到null阻止运行
      if (!ref) return // 给dom绑定事件
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
        className="relative flex items-center justify-center cursor-pointer w-10 h-10 border border-solid rounded-full p-2 bg-gradient-to-b from-orange-400 to-yellow-400 dark:from-[#39598a] dark:to-[#79d7ed]"
        onClick={lodash.debounce(() => {
          changeTheme()
        }, 200)}
      >
        <div
          ref={callbackRef}
          className="absolute w-6 h-6 transform duration-1000 ease-in-out morning"
        >
          <Morning className="w-full h-full"></Morning>
        </div>
        <div className="absolute w-6 h-6 transform duration-1000 ease-in-out night">
          <Night className="w-full h-full"></Night>
        </div>
      </div>
    </div>
  )
}
