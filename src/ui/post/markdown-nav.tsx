"use client"
import clsx from "clsx"
import { atom } from "jotai"
import { useEffect, useState } from "react"
const textAtom = atom("")

export default function MarkdownNav(props: any) {
  const [isCurrent, setCurrent] = useState(false)

  useEffect(() => {
    // 定义处理 hash 变化的函数
    const handleHashChange = () => {
      const newHash = decodeURIComponent(window.location.hash)
      if (props.tagName === "a") {
        if (props.properties.href.toLowerCase() === newHash) {
          document.getElementById(props.properties.href)?.click()
          setCurrent(true)
        } else {
          setCurrent(false)
        }
      }
    }

    // 初始化时检查一次 hash
    handleHashChange()

    // 添加 hashchange 事件监听器
    window.addEventListener("hashchange", handleHashChange)
    const handleScroll = () => {
      if (props.tagName === "a") {
        const id = props.properties.href
        const element = document.getElementById(id)
        const offsetTop = element?.getBoundingClientRect().top
        if (offsetTop && offsetTop > 96 && offsetTop < 100) {
          console.log("当前范围在：", props.properties.href)
          window.location.hash = props.properties.href.toLowerCase()
        }
        if (window.scrollY === 0) {
          window.location.hash = ""
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("scroll", handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  switch (props.tagName) {
    case "nav": {
      return (
        <nav {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </nav>
      )
    }
    case "ol": {
      return (
        <ol {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </ol>
      )
    }
    case "li": {
      return (
        <li {...props.properties}>
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </li>
      )
    }
    case "a": {
      return (
        <>
          <a
            {...props.properties}
            className={clsx(
              isCurrent
                ? "text-highlight border-l-2 border-highlight-light dark:border-highlight-dark"
                : "text-default-700",
              "block p-2 text-sm font-medium text-highlight-hover focus:outline-none"
            )}
          >
            {props.children.map((item: any, index: number) => {
              return <MarkdownNav {...item} key={index} />
            })}
          </a>
        </>
      )
    }
    default:
      return <>{props.value}</>
  }
}
