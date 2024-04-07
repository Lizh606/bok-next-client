"use client"

import type { Post } from "@/lib/posts"
import { useEffect, useState } from "react"
import MarkdownNav from "./markdown-nav"

import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"

import { CopyButton1 } from "@/components/CopyButton"
import toc from "@jsdevtools/rehype-toc"
import { Card, CardBody } from "@nextui-org/react"
import "highlight.js/styles/atom-one-dark.css"

export default function MarkDownPage({ post }: { post: Post }) {
  let data = {}

  const [tocData, setTocData] = useState({})

  useEffect(() => {
    setTocData(data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="markdown col-span-3">
        <ReactMarkdown
          rehypePlugins={[
            rehypeHighlight,
            rehypeSlug,
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
                    className="relative -top-24 invisible"
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
                    className="relative -top-24 invisible"
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
                    className="relative -top-24 invisible"
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
                    className="relative -top-24 invisible"
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
                    className="relative -top-24 invisible"
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
          <CardBody className="overflow-visible py-2 relative flex flex-col h-full max-h-[70vh]">
            <h3 className="text-default-900 text-xl font-bold pb-4">目录</h3>
            <div className="overflow-y-auto flex-1 min-h-0">
              <MarkdownNav {...tocData}></MarkdownNav>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
