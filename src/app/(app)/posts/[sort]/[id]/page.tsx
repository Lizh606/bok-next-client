import WithIconTime from "@/components/WithIconTime"
import { getPostById } from "@/lib/post"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
import type { Metadata } from "next"

let metadata: Metadata = {}

type Props = {
  params: { id: number; sort: string }
  // searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.id)
  return {
    title: post.title
  }
}

export default async function Post({ params }: Props) {
  const post = await getPostById(params.id)
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
        <MarkDownPage post={post}></MarkDownPage>
      </div>
    </div>
  )
}
