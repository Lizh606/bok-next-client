import { CopyButton1 } from "@/components/CopyButton"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXRemote } from "next-mdx-remote"
import Image from "next/image"
import React, { useId } from "react"
import MdxHeading from "./mdx-heading"

type Props = {
  mdxSource: MDXRemoteSerializeResult
}

export default function RemoteMdxPage({ mdxSource }: Props) {
  const components = {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <MdxHeading {...props} level={1} />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <MdxHeading {...props} level={2} />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <MdxHeading {...props} level={3} />
    ),
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
      <MdxHeading {...props} level={4} />
    ),
    h5: (props: React.ComponentPropsWithoutRef<"h5">) => (
      <MdxHeading {...props} level={5} />
    ),
    p: (props: React.ComponentPropsWithoutRef<"p">) => {
      return <p>{props.children}</p>
    },
    pre: ({ children }: React.ComponentPropsWithoutRef<"pre">) => (
      <pre className="not-prose">{children}</pre>
    ),
    img: (props: React.ComponentPropsWithoutRef<"img">) => {
      return (
        <Image
          src={(props.src as string) || ""}
          alt={props.alt || ""}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority={false}
          loading="lazy"
          unoptimized={process.env.NODE_ENV !== "production"}
        />
      )
    },

    code: function Code(
      info: React.ComponentPropsWithoutRef<"code"> & {
        "data-language"?: string
      }
    ) {
      const { children, ...props } = info
      const id = useId()
      const dataLanguage = info["data-language"]

      if (dataLanguage) {
        return (
          <div className="not-prose rounded-md border">
            <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {dataLanguage}
                </span>
              </div>
              <CopyButton1 id={id} />
            </div>
            <div className="overflow-x-auto p-4">
              <code id={id} {...props}>
                {children}
              </code>
            </div>
          </div>
        )
      } else {
        return (
          <code
            {...props}
            className="not-prose rounded bg-gray-200 px-1 text-slate-500 dark:bg-gray-900"
          >
            {children}
          </code>
        )
      }
    }
  }
  return (
    <div className="markdown prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}
