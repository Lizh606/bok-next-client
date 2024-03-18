import { MDXRemoteProps } from "next-mdx-remote/rsc"

import { Code } from "@/app/components/Code"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [[remarkToc, { maxDepth: 4 }], remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          // theme: {
          //   dark: "github-dark-dimmed",
          //   light: "github-light"
          // },
          keepBackground: true
        }
      ],
      rehypeSlug
    ]
  }
}
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug)
  return { post }
}

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Post({ params }: Props) {
  const { post } = await getPost(params)

  return (
    <>
      <h1 className="text-2xl">{post.meta.title}</h1>
      <time className="text-gray-600">{post.meta?.date.toString()}</time>
      {/* <Markdown content={post.content} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} /> */}
      {/* <MDXRemote source={post.content} components={{}} options={options} /> */}
      <Code code={post.content}></Code>
    </>
  )
}
