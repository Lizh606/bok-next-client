import { CopyButton1 } from "@/components/CopyButton"
import type { Locale } from "@/i18n/config"
import { getPostById } from "@/lib/post"
import type { Element, Root, Text } from "hast"
import { MDXRemote } from "next-mdx-remote/rsc"
import React from "react"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { visit } from "unist-util-visit"

export const revalidate = 1800

type RemoteMdxProps = {
  params: Promise<{
    locale: Locale
  }>
}

interface ComponentProps {
  id?: string
  children?: React.ReactNode
}

export default async function RemoteMdxPage(props: RemoteMdxProps) {
  const params = await props.params
  const post = await getPostById(3, params.locale)
  if (!post) return <div>Post not found</div>
  const markdown = post.content
  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        rehypeSlug,
        () => (tree: Root) => {
          visit(tree, "element", (node: Element) => {
            if (node.tagName === "pre") {
              const codeEl = node.children[0] as Element
              if (codeEl?.tagName !== "code") return
              const textNode = codeEl.children[0] as Text
              if (textNode && "value" in textNode) {
                ;(node as any).raw = textNode.value
              }
            }
          })
        },
        [
          rehypePrettyCode,
          {
            theme: "material-theme-lighter"
          }
        ],
        () => (tree: Root) => {
          visit(tree, "element", (node: Element) => {
            if (
              !node.properties ||
              !("data-rehype-pretty-code-fragment" in node.properties)
            ) {
              return
            }
            for (const child of node.children) {
              if (child.type === "element" && child.tagName === "pre") {
                child.properties = child.properties || {}
                child.properties["raw"] = (node as any).raw
              }
            }
          })
        }
      ]
    }
  }
  const components = {
    h1: (props: ComponentProps) => (
      <h1>
        <div id={props.id} className="invisible relative -top-24"></div>
        <a href={"#" + props.id}>{props.children}</a>
      </h1>
    ),
    h2: (props: ComponentProps) => (
      <h2>
        <div id={props.id} className="invisible relative -top-24"></div>
        <a href={"#" + props.id}>{props.children}</a>
      </h2>
    ),
    h3: (props: ComponentProps) => (
      <h3>
        <div id={props.id} className="invisible relative -top-24"></div>
        <a href={"#" + props.id}>{props.children}</a>
      </h3>
    ),
    h4: (props: ComponentProps) => (
      <h4>
        <div id={props.id} className="invisible relative -top-24"></div>
        <a href={"#" + props.id}>{props.children}</a>
      </h4>
    ),
    h5: (props: ComponentProps) => (
      <h4>
        <div id={props.id} className="invisible relative -top-24"></div>
        <a href={"#" + props.id}>{props.children}</a>
      </h4>
    ),
    p: (props: ComponentProps) => <p>{props.children}</p>,
    pre: ({ children }: ComponentProps) => (
      <pre className="not-prose">{children}</pre>
    ),
    code: (
      info: React.ComponentPropsWithoutRef<"code"> & {
        "data-language"?: string
      }
    ) => {
      const { children } = info
      const id = Math.random().toString(36).substr(2, 9)
      if (info["data-language"]) {
        return (
          <div className="not-prose rounded-md border">
            <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
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
            className="not-prose rounded bg-gray-100 px-1 dark:bg-gray-800"
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
