import WithIconTime from "@/components/WithIconTime"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getPostById, getPostList, type Post } from "@/lib/post"
import GiscusPanel from "@/ui/post/giscus-panel"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import toc from "@jsdevtools/rehype-toc"
import type { Metadata } from "next"
import { serialize } from "next-mdx-remote/serialize"
import { draftMode } from "next/headers"
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
    .filter((post: Post) => post.id && post.sort)
    .map((post: Post) => ({
      id: post.id,
      sort: post.sort
    }))
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { isEnabled } = await draftMode()
  const post = await getPostById(params.id, params.locale, isEnabled)
  return {
    title: post.title
  }
}

export default async function Post(props: Props) {
  const params = await props.params
  const dictionary = await getDictionary(params.locale)
  const { isEnabled } = await draftMode()
  const post = await getPostById(params.id, params.locale, isEnabled)

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
