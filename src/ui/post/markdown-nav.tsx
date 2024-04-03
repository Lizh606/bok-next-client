"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"

export default function MarkdownNav(props: any) {
  const [isCurrent, setCurrent] = useState(false)

  useEffect(() => {
    // 定义处理 hash 变化的函数
    const handleHashChange = () => {
      const newHash = decodeURIComponent(window.location.hash)
      if (props.tagName === "a") {
        setCurrent(props.properties.href.toLowerCase() === newHash)
      }
    }

    // 初始化时检查一次 hash
    handleHashChange()

    // 添加 hashchange 事件监听器
    window.addEventListener("hashchange", handleHashChange)

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
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
        <a
          {...props.properties}
          className={clsx(
            isCurrent
              ? "text-sky-500 border-l-2 border-sky-500"
              : "text-neutral-400",
            "block p-2 text-sm font-medium hover:text-sky-500 focus:outline-none"
          )}
        >
          {props.children.map((item: any, index: number) => {
            return <MarkdownNav {...item} key={index} />
          })}
        </a>
      )
    }
    default:
      return <>{props.value}</>
  }
}
