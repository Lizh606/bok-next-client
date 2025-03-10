"use client"
import clsx from "clsx"
import { debounce } from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
export default function MarkdownNav(props: any) {
  const [isCurrent, setCurrent] = useState(false)
  // 使用 useCallback 优化路由变化处理函数
  const handleRouteChange = useCallback(() => {
    if (props.tagName === "a" && props.properties.href) {
      const newHash = decodeURIComponent(window.location.hash)
      const isCurrenHash = props.properties.href.toLowerCase() === newHash
      setCurrent(isCurrenHash)
    }
  }, [props.tagName, props.properties?.href])

  // 使用 useMemo 缓存 DOM 选择器
  const getHashList = useCallback(() => {
    const allLinks = document.querySelectorAll("a[href^='#']")
    return Array.from(allLinks)
      .map((link) => (link as HTMLAnchorElement).href.split("#")[1])
      .filter(Boolean)
      .map((hash) => decodeURIComponent(hash))
      .map((hash) => `#${hash}`)
  }, [])

  // 优化滚动处理函数
  const handleScroll = useMemo(
    () =>
      debounce(async () => {
        if (props.tagName !== "a") return
        const hashList = getHashList()
        const inRangeHashList = hashList.filter((hash) => {
          const element = document.getElementById(hash)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top > 72 && rect.top < 150
        })

        // 使用 Set 去重并找出最近的 hash
        const closestHash = [...new Set(inRangeHashList)].reduce(
          (closest, hash) => {
            const element = document.getElementById(hash)
            if (!element) return closest
            const distance = Math.abs(element.getBoundingClientRect().top - 70)
            return distance < closest.distance ? { hash, distance } : closest
          },
          { hash: "", distance: Infinity }
        ).hash
        // 更新 URL
        if (closestHash) {
          if (props.properties.href === closestHash) {
            const newUrl = `${window.location.pathname}${window.location.search}${props.properties.href.toLowerCase()}`
            history.replaceState(null, "", newUrl)
          }
        }
        if (window.scrollY === 0) {
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          )
        }
        setTimeout(() => {
          handleRouteChange()
        }, 200)
      }, 200), // 减少防抖时间以提高响应性
    [props.tagName, props.properties?.href, handleRouteChange, getHashList]
  )
  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  switch (props.tagName) {
    case "nav":
      return (
        <nav {...props.properties}>
          {props.children.map((item: any, index: number) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </nav>
      )
    case "ol":
      return (
        <ol {...props.properties}>
          {props.children.map((item: any, index: number) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </ol>
      )
    case "li":
      return (
        <li {...props.properties}>
          {props.children.map((item: any, index: number) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </li>
      )
    case "a":
      return (
        <a
          {...props.properties}
          className={clsx(
            isCurrent
              ? "text-highlight border-l-2 border-highlight-light dark:border-highlight-dark"
              : "text-default-700",
            "text-highlight-hover block p-2 text-sm font-medium focus:outline-none"
          )}
        >
          {props.children.map((item: any, index: number) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </a>
      )
    default:
      return <>{props.value}</>
  }
}
