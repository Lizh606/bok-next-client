"use client"
import Loading from "@/app/[locale]/(app)/loading"
import type { Post } from "@/lib/post"
import { Card, CardBody } from "@heroui/react"
import "highlight.js/styles/atom-one-light.css"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useRef } from "react"
import MarkdownNav, { type TocNode } from "./markdown-nav"

const RemoteMdxPage = dynamic(() => import("./mdx-remote-page"), {
  loading: () => <Loading></Loading>,
  ssr: false
})

// ... (existing codes)

export default function MarkDownPage({
  post,
  mdxSource,
  initialToc
}: {
  post: Post
  mdxSource: MDXRemoteSerializeResult
  initialToc: TocNode
}) {
  // 使用 useMemo 替代 Effect 同步 setState 以避免额外渲染
  const currentTocData = useMemo(() => initialToc || {}, [initialToc])

  const ref = useRef(null)
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash)
    const navElement = document.querySelector(`nav a[href='${hash}']`)
    if (navElement) {
      navElement.scrollIntoView({
        behavior: "auto",
        block: "center"
      })
      setTimeout(() => {
        document.getElementById(hash)?.click()
      }, 500)
    }
  }, [currentTocData])

  return (
    <>
      <div className="markdown col-span-3" ref={ref}>
        <RemoteMdxPage mdxSource={mdxSource}></RemoteMdxPage>
      </div>
      <div className="block">
        <Card className="sticky top-24">
          <CardBody className="relative flex h-full max-h-[60vh] flex-col gap-4 overflow-visible py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-default-900">目录</h3>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <MarkdownNav {...currentTocData}></MarkdownNav>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
