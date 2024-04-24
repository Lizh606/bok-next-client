import WithIconTime from "@/components/WithIconTime"
import { getPostById } from "@/lib/post"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import type { Metadata } from "next"

let metadata: Metadata = {}

type Props = {
  params: { id: number; sort: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Post({ params }: Props) {
  const post = await getPostById(params.id)
  metadata.title = post.title
  return (
    <div className="mt-20">
      <h1 className="text-4xl font-bold text-center text-balance mb-4">
        {post.title}
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="flex gap-4 items-center text-default-700">
          <WithIconTime
            time={calculateTimeDifference(post.date.toString())}
          ></WithIconTime>
          <span>#{post.tag}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 relative mt-8">
        <MarkDownPage post={post}></MarkDownPage>
      </div>
    </div>
  )
}
export { metadata }
