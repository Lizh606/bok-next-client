import WithIconTime from "@/components/WithIconTime"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getPostById, getPostList } from "@/lib/post"
import GiscusPanel from "@/ui/post/giscus-panel"
import type { TocNode } from "@/ui/post/markdown-nav"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import toc from "@jsdevtools/rehype-toc"
import type { Element, Root, Text } from "hast"
import type { Metadata } from "next"
import { serialize } from "next-mdx-remote/serialize"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

export const revalidate = 1800

type Props = {
  params: Promise<{ locale: Locale; id: string; sort: string }>
}

export async function generateStaticParams() {
  const posts = await getPostList({ page: 1, size: 999 })
  return posts
    .filter((post) => post.id && post.sort)
    .map((post) => ({
      id: String(post.id),
      sort: post.sort
    }))
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const post = await getPostById(Number(params.id))
  return {
    title: post?.title || "Post"
  }
}

export default async function Post(props: Props) {
  const params = await props.params
  const dictionary = await getDictionary(params.locale)
  const post = await getPostById(Number(params.id))
  if (!post) {
    return <div className="mt-20 text-center">Post not found</div>
  }

  // Serialize MDX on the server
  const { mdxSource, tocData } = await (async () => {
    let internalTocData: TocNode = {} as TocNode
    const source = await serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          () => (tree: Root) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName === "pre") {
                const codeEl = node.children[0] as Element
                if (codeEl?.tagName !== "code") return
                const textNode = codeEl.children[0] as Text
                if (textNode && "value" in textNode) {
                  ;(node as Element & { raw: string }).raw = textNode.value
                }
              }
            })
          },
          [rehypePrettyCode, { theme: "material-theme-lighter" }],
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
                  child.properties["raw"] = (
                    node as Element & { raw: string }
                  ).raw
                }
              }
            })
          },
          [
            //@ts-ignore
            toc,
            {
              headings: ["h1", "h2", "h3", "h4", "h5"],
              customizeTOC: (tocAll: TocNode) => {
                internalTocData = tocAll
                return false
              }
            }
          ]
        ]
      }
    })
    return { mdxSource: source, tocData: internalTocData }
  })()

  return (
    <div className="mt-20">
      <h1 className="mb-4 text-balance text-center text-4xl font-bold">
        {post.title}
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-4 text-default-700">
          <WithIconTime
            time={calculateTimeDifference(post.date.toString())}
            alt={dictionary.postDetail.timeAlt}
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
