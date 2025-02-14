"use client"
import Giscus from "@giscus/react"
export default function GiscusPanel({ title }: { title: string }) {
  return (
    <div className="mt-4">
      <Giscus
        id="comments"
        repo="Lizh606/bok-next-client"
        repoId="R_kgDOLfq9YQ"
        category="Announcements"
        categoryId="bok-comments"
        mapping="specific"
        term={title}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
      />
    </div>
  )
}
