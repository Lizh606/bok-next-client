"use client"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"

import { CopyButton1 } from "@/components/CopyButton"
import toc from "@jsdevtools/rehype-toc"
import "highlight.js/styles/atom-one-dark.css"

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown
        className="prose prose-zinc max-w-none dark:prose-invert"
        rehypePlugins={[
          rehypeHighlight,
          rehypeSlug,
          [
            //@ts-ignore
            toc,
            {
              headings: ["h1", "h2", "h3", "h4"],
              customizeTOC: (tocAll: any) => {
                return false
              }
            }
          ]
        ]}
        components={{
          h1: (props) => {
            return (
              <h1>
                <div id={props.id} className="relative -top-24 invisible"></div>
                <a href={"#" + props.id}>{props.children}</a>
              </h1>
            )
          },
          h2: (props) => {
            return (
              <h2>
                <div id={props.id} className="relative -top-24 invisible"></div>
                <a href={"#" + props.id}>{props.children}</a>
              </h2>
            )
          },
          h3: (props) => {
            return (
              <h3>
                <div id={props.id} className="relative -top-24 invisible"></div>
                <a href={"#" + props.id}>{props.children}</a>
              </h3>
            )
          },
          h4: (props) => {
            return (
              <h4>
                <div id={props.id} className="relative -top-24 invisible"></div>
                <a href={"#" + props.id}>{props.children}</a>
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
                      {/* <Terminal size={18} /> */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {data?.meta}
                      </p>
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
        {content}
      </ReactMarkdown>
    </>
  )
}

export default MarkdownContent
