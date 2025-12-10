"use client"

import { CopyButton1 } from "@/components/CopyButton"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXRemote } from "next-mdx-remote"
import Image from "next/image"

type Props = {
  mdxSource: MDXRemoteSerializeResult
}

export default function RemoteMdxPage({ mdxSource }: Props) {
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
      return (
        <Image
          src={props.src}
          alt={props.alt || ""}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority={false}
          loading="lazy"
        />
      )
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
            className="not-prose rounded bg-gray-200 px-1 text-slate-500 dark:bg-gray-900"
          >
            {children}
          </code>
        )
      }
    }
  }
  return (
    <MDXRemote {...mdxSource} components={components} />
  )
}
