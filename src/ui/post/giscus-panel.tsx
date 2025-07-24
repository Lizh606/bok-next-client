"use client"
import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

export default function GiscusPanel({ title }: { title: string }) {
  // 在开发环境下给 title 添加 [DEV] 标识
  const commentTitle =
    process.env.NODE_ENV === "development" ? `[DEV] ${title}` : title
  const { theme } = useTheme()
  const currentTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  return (
    <div className="mt-4">
      <Giscus
        id="comments"
        repo="Lizh606/bok-next-client"
        repoId="R_kgDOLfq9YQ"
        category="Announcements"
        categoryId="DIC_kwDOLfq9Yc4CmxU7"
        mapping="specific"
        term={commentTitle} // 使用添加了环境标识的标题
        strict="0"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme={currentTheme === "dark" ? "dark" : "light"}
        lang="zh-CN"
      />
    </div>
  )
}
