"use client"
import clsx from "clsx"
import { debounce } from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"

export interface TocNode {
  tagName: "nav" | "ol" | "li" | "a" | string
  properties?: {
    href?: string
    [key: string]: unknown
  }
  children?: TocNode[]
  value?: string
}

export default function MarkdownNav(props: TocNode) {
  const [isCurrent, setCurrent] = useState(false)

  const { tagName, properties } = props
  const href = properties?.href

  const handleRouteChange = useCallback(() => {
    if (tagName === "a" && href) {
      const newHash = decodeURIComponent(window.location.hash)
      setCurrent(href.toLowerCase() === newHash)
    }
  }, [tagName, href])

  const getHashList = useCallback(() => {
    const allLinks = document.querySelectorAll("a[href^='#']")
    return Array.from(allLinks)
      .map((link) => (link as HTMLAnchorElement).href.split("#")[1])
      .filter(Boolean)
      .map((hash) => `#${decodeURIComponent(hash)}`)
  }, [])

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (props.tagName !== "a") return
        const hashList = getHashList()
        const inRangeHashList = hashList.filter((hash) => {
          const element = document.getElementById(hash.slice(1))
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top > 72 && rect.top < 150
        })

        const closestHash = inRangeHashList.reduce(
          (closest, hash) => {
            const element = document.getElementById(hash.slice(1))
            if (!element) return closest
            const distance = Math.abs(element.getBoundingClientRect().top - 70)
            return distance < closest.distance ? { hash, distance } : closest
          },
          { hash: "", distance: Infinity }
        ).hash

        if (closestHash && props.properties?.href === closestHash) {
          const newUrl = `${window.location.pathname}${window.location.search}${closestHash.toLowerCase()}`
          history.replaceState(null, "", newUrl)
        }

        if (window.scrollY === 0) {
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          )
        }
      }, 200),
    [props.tagName, props.properties?.href, getHashList]
  )

  useEffect(() => {
    // 初始执行，通过延迟或调度逻辑避免 React 19 同步 setState 警告
    const timer = setTimeout(() => handleRouteChange(), 0)
    window.addEventListener("hashchange", handleRouteChange)
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("hashchange", handleRouteChange)
      window.removeEventListener("scroll", handleScroll)
      handleScroll.cancel()
    }
  }, [handleRouteChange, handleScroll])

  const safeProperties = useMemo(() => {
    const { ...rest } = props.properties || {}
    return rest as Record<string, unknown>
  }, [props.properties])

  switch (props.tagName) {
    case "nav":
      return (
        <nav {...safeProperties}>
          {props.children?.map((item, index) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </nav>
      )
    case "ol":
      return (
        <ol {...safeProperties}>
          {props.children?.map((item, index) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </ol>
      )
    case "li":
      return (
        <li {...safeProperties}>
          {props.children?.map((item, index) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </li>
      )
    case "a":
      return (
        <a
          {...safeProperties}
          className={clsx(
            isCurrent
              ? "text-highlight border-l-2 border-highlight-light dark:border-highlight-dark"
              : "text-default-700",
            "text-highlight-hover block p-2 text-sm font-medium focus:outline-none"
          )}
        >
          {props.children?.map((item, index) => (
            <MarkdownNav {...item} key={index} />
          ))}
        </a>
      )
    default:
      return <>{props.value}</>
  }
}
