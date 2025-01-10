import { getPostById } from "@/lib/post"
import { MDXRemote } from "next-mdx-remote/rsc"
export default async function RemoteMdxPage() {
  const post = await getPostById(4)
  if (!post) return <div>Post not found</div>
  const markdown = post.content
  return (
    <MDXRemote
      source={markdown}
      options={{
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: []
        }
      }}
      // components={{
      //   h1: (props) => {
      //     return (
      //       <h1>
      //         <div id={props.id} className="invisible relative -top-24"></div>
      //         <a href={"#" + props.id} id={"#" + props.id}>
      //           {props.children}
      //         </a>
      //       </h1>
      //     )
      //   },
      //   h2: (props) => {
      //     return (
      //       <h2>
      //         <div id={props.id} className="invisible relative -top-24"></div>
      //         <a href={"#" + props.id} id={"#" + props.id}>
      //           {props.children}
      //         </a>
      //       </h2>
      //     )
      //   },
      //   h3: (props) => {
      //     return (
      //       <h3>
      //         <div id={props.id} className="invisible relative -top-24"></div>
      //         <a href={"#" + props.id} id={"#" + props.id}>
      //           {props.children}
      //         </a>
      //       </h3>
      //     )
      //   },
      //   h4: (props) => {
      //     return (
      //       <h4>
      //         <div id={props.id} className="invisible relative -top-24"></div>
      //         <a href={"#" + props.id} id={"#" + props.id}>
      //           {props.children}
      //         </a>
      //       </h4>
      //     )
      //   },
      //   h5: (props) => {
      //     return (
      //       <h4>
      //         <div id={props.id} className="invisible relative -top-24"></div>
      //         <a href={"#" + props.id} id={"#" + props.id}>
      //           {props.children}
      //         </a>
      //       </h4>
      //     )
      //   },
      //   pre: ({ children }) => <pre className="not-prose">{children}</pre>,
      //   code: ({ className, children, ...props }) => {
      //     const match = /language-(\w+)/.exec(className || "")
      //     if (match?.length) {
      //       const id = Math.random().toString(36).substr(2, 9)
      //       return (
      //         <div className="not-prose rounded-md border">
      //           <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
      //             <div className="flex items-center gap-2">
      //               <span className="text-sm text-zinc-600 dark:text-zinc-400">
      //                 {match[1]}
      //               </span>
      //             </div>
      //             <CopyButton1 id={id} />
      //           </div>
      //           <div className="overflow-x-auto">
      //             <div id={id} className="p-4">
      //               {children}
      //             </div>
      //           </div>
      //         </div>
      //       )
      //     } else {
      //       return (
      //         <code
      //           {...props}
      //           className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
      //         >
      //           {children}
      //         </code>
      //       )
      //     }
      //   }
      // }}
    />
  )
}
