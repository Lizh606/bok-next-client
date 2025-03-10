import { CopyButton1 } from "@/components/CopyButton"
import { getPostById } from "@/lib/post"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { visit } from "unist-util-visit"

export default async function RemoteMdxPage() {
  const post = await getPostById(3)
  if (!post) return <div>Post not found</div>
  const markdown = post.content
  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [],
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
        }
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
    // code: ({ node, className, children, ...props }: any) => {
    //   const match = /language-(\w+)/.exec(className || "")
    //   if (match?.length) {
    //     const id = Math.random().toString(36).substr(2, 9)
    //     return (
    //       <div className="not-prose rounded-md border">
    //         <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
    //           <div className="flex items-center gap-2">
    //             <span className="text-sm text-zinc-600 dark:text-zinc-400">
    //               {match[1]}
    //             </span>
    //           </div>
    //           <CopyButton1 id={id} />
    //         </div>
    //         <div className="overflow-x-auto">
    //           <div id={id} className="p-4">
    //             {children}
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <code
    //         {...props}
    //         className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
    //       >
    //         {children}
    //       </code>
    //     )
    //   }
    // }

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
