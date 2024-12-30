"use client"

import { useEffect, useRef, useState } from "react"
import MarkdownNav from "./markdown-nav"

import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import { CopyButton1 } from "@/components/CopyButton"
import useScrollToTop from "@/hooks/useScrollToTop"
import type { Post } from "@/lib/post"
import toc from "@jsdevtools/rehype-toc"
import { Card, CardBody } from "@nextui-org/react"
import { useScroll } from "framer-motion"
import "highlight.js/styles/atom-one-dark.css"
export default function MarkDownPage({ post }: { post: Post }) {
  let data = {}

  const [tocData, setTocData] = useState({})
  const { isAtTop } = useScrollToTop()

  useEffect(() => {
    setTocData(data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const ref = useRef(null)
  const circleRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    // 当 scrollYProgress 变化时更新 percent
    const updatePercent = () => {
      const currentPercent = scrollYProgress.get()
      setPercent(Math.round(currentPercent * 100))
    }

    // 初始化时更新一次 percent
    updatePercent()

    // 监听 scrollYProgress 的变化，并更新 percent
    const unsubscribe = scrollYProgress.onChange(updatePercent)

    // 组件卸载时取消监听
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress]) // 依赖于 scrollYProgress 的变化
  return (
    <>
      <div className="markdown col-span-3" ref={ref}>
        <ReactMarkdown
          rehypePlugins={[
            rehypeHighlight,
            rehypeSlug,
            rehypeRaw,
            remarkGfm,
            [
              //@ts-ignore
              toc,
              {
                headings: ["h1", "h2", "h3", "h4", "h5"],
                customizeTOC: (tocAll: any) => {
                  data = tocAll
                  return false
                }
              }
            ]
          ]}
          components={{
            h1: (props) => {
              return (
                <h1>
                  <div
                    id={props.id}
                    className="invisible relative -top-24"
                  ></div>
                  <a href={"#" + props.id} id={"#" + props.id}>
                    {props.children}
                  </a>
                </h1>
              )
            },
            h2: (props) => {
              return (
                <h2>
                  <div
                    id={props.id}
                    className="invisible relative -top-24"
                  ></div>
                  <a href={"#" + props.id} id={"#" + props.id}>
                    {props.children}
                  </a>
                </h2>
              )
            },
            h3: (props) => {
              return (
                <h3>
                  <div
                    id={props.id}
                    className="invisible relative -top-24"
                  ></div>
                  <a href={"#" + props.id} id={"#" + props.id}>
                    {props.children}
                  </a>
                </h3>
              )
            },
            h4: (props) => {
              return (
                <h4>
                  <div
                    id={props.id}
                    className="invisible relative -top-24"
                  ></div>
                  <a href={"#" + props.id} id={"#" + props.id}>
                    {props.children}
                  </a>
                </h4>
              )
            },
            h5: (props) => {
              return (
                <h4>
                  <div
                    id={props.id}
                    className="invisible relative -top-24"
                  ></div>
                  <a href={"#" + props.id} id={"#" + props.id}>
                    {props.children}
                  </a>
                </h4>
              )
            },
            pre: ({ children }) => <pre className="not-prose">{children}</pre>,
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "")
              if (match?.length) {
                const id = Math.random().toString(36).substr(2, 9)
                const data = node?.data as any
                return (
                  <div className="not-prose rounded-md border">
                    <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {data?.meta}
                        </span>
                      </div>
                      <CopyButton1 id={id} />
                    </div>
                    <div className="overflow-x-auto">
                      <div id={id} className="p-4">
                        {children}
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <code
                    {...props}
                    className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
                  >
                    {children}
                  </code>
                )
              }
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <div className="block">
        <Card className="sticky top-24">
          <CardBody className="relative flex h-full max-h-[60vh] flex-col gap-4 overflow-visible py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-default-900">目录</h3>
              {/* <div
                className={clsxm(
                  "flex flex-col gap-2",
                  isAtTop ? "hidden" : "flex"
                )}
              >
                <div className="flex gap-1 items-center">
                  <svg
                    id="progress"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-highlight-light dark:stroke-highlight-dark opacity-20 "
                    />
                    <motion.circle
                      ref={circleRef}
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-highlight-light dark:stroke-highlight-dark "
                      style={{ pathLength: scrollYProgress }}
                    />
                  </svg>
                  <span className="text-default-400">{percent}%</span>
                </div>
              </div> */}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <MarkdownNav {...tocData}></MarkdownNav>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
