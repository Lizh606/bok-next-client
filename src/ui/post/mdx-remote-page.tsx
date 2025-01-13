"use client"

import { CopyButton1 } from "@/components/CopyButton"
import { type Post } from "@/lib/post"
import toc from "@jsdevtools/rehype-toc"
import { MDXRemote } from "next-mdx-remote/rsc"
import { useEffect } from "react"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

export default function RemoteMdxPage({
  post,
  setTocData
}: {
  post: Post
  setTocData: (data: any) => void
}) {
  let data = {}
  useEffect(() => {
    setTocData(data)
  }, [])
  if (!post) return <div>Post not found</div>
  const markdown = post.content
  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        () => (tree: any) => {
          visit(tree, (node: any) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children
              if (codeEl.tagName !== "code") return
              node.raw = codeEl.children?.[0].value
            }
          })
        },
        [
          rehypePrettyCode,
          {
            theme: "material-theme-lighter"
          }
        ],
        () => (tree: any) => {
          visit(tree, (node: any) => {
            if (node?.type === "element") {
              if (!("data-rehype-pretty-code-fragment" in node.properties)) {
                return
              }
              for (const child of node.children) {
                if (child.tagName === "pre") {
                  child.properties["raw"] = node.raw
                }
              }
            }
          })
        },
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
      ]
    }
  }
  const components = {
    h1: (props: any) => {
      return (
        <h1>
          <div id={props.id} className="invisible relative -top-24"></div>
          <a href={"#" + props.id} id={"#" + props.id}>
            {props.children}
          </a>
        </h1>
      )
    },
    h2: (props: any) => {
      return (
        <h2>
          <div id={props.id} className="invisible relative -top-24"></div>
          <a href={"#" + props.id} id={"#" + props.id}>
            {props.children}
          </a>
        </h2>
      )
    },
    h3: (props: any) => {
      return (
        <h3>
          <div id={props.id} className="invisible relative -top-24"></div>
          <a href={"#" + props.id} id={"#" + props.id}>
            {props.children}
          </a>
        </h3>
      )
    },
    h4: (props: any) => {
      return (
        <h4>
          <div id={props.id} className="invisible relative -top-24"></div>
          <a href={"#" + props.id} id={"#" + props.id}>
            {props.children}
          </a>
        </h4>
      )
    },
    h5: (props: any) => {
      return (
        <h4>
          <div id={props.id} className="invisible relative -top-24"></div>
          <a href={"#" + props.id} id={"#" + props.id}>
            {props.children}
          </a>
        </h4>
      )
    },
    p: (props: any) => {
      return <p>{props.children}</p>
    },
    pre: ({ children }: any) => <pre className="not-prose">{children}</pre>,
    img: (props: any) => {
      console.log(props)
      return <img src={props.src} alt={props.alt} />
    },
    code: (info: any) => {
      const { children } = info
      const id = Math.random().toString(36).substr(2, 9)
      // @ts-ignore
      if (info["data-language"]) {
        return (
          <div className="not-prose rounded-md border">
            <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {/* @ts-ignore */}
                  {info["data-language"]}
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
            {...info}
            className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
          >
            {children}
          </code>
        )
      }
    }
  }
  return (
    <MDXRemote
      source={markdown}
      // @ts-ignore
      options={mdxOptions}
      components={components}
    />
  )
}
