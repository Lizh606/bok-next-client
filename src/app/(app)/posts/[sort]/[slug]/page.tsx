import WithIconTime from "@/components/WithIconTime"
import { getPostBySlug } from "@/lib/posts"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import type { Metadata } from "next"

let metadata: Metadata = {
  title: "XiaoHang-bok",
  description: "XiaoHang的博客"
}

type Props = {
  params: { slug: string; sort: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Post({ params }: Props) {
  const post = getPostBySlug(
    decodeURIComponent(params.slug),
    decodeURIComponent(params.sort)
  )
  metadata.title = post.slug
  return (
    <div className="mt-20">
      <h1 className="text-4xl font-bold text-center text-balance mb-4">
        {post.slug}
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="flex gap-4 items-center text-default-700">
          <WithIconTime
            time={calculateTimeDifference(post.meta.date.toString())}
          ></WithIconTime>
          <span>#{post.meta.tag}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 relative mt-8">
        <MarkDownPage post={post}></MarkDownPage>
      </div>
    </div>
  )
}
export { metadata }
