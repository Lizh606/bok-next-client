import WithIconTime from "@/components/WithIconTime"
import { getPostById } from "@/lib/post"
import toc from "@jsdevtools/rehype-toc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import { visit } from "unist-util-visit"
import { serialize } from "next-mdx-remote/serialize"
import GiscusPanel from "@/ui/post/giscus-panel"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ id: number; sort: string }>
  // searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostById(params.id)
  return {
    title: post.title
  }
}

export default async function Post(props: Props) {
  const params = await props.params;
  const post = await getPostById(params.id)

  // Serialize MDX on the server to avoid client-side async suspension
  let tocData: any = {}
  const mdxSource = await serialize(post.content, {
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
              tocData = tocAll
              return false
            }
          }
        ]
      ]
    }
  })

  return (
    <div className="mt-20">
      <h1 className="mb-4 text-balance text-center text-4xl font-bold">
        {post.title}
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-4 text-default-700">
          <WithIconTime
            time={calculateTimeDifference(post.date.toString())}
          ></WithIconTime>
          <span>#{post.tag}</span>
        </div>
      </div>
      <div className="relative mt-8 grid grid-cols-4 gap-6">
        <MarkDownPage
          post={post}
          mdxSource={mdxSource}
          initialToc={tocData}
        ></MarkDownPage>
      </div>
      <GiscusPanel title={post.title} />
    </div>
  )
}
