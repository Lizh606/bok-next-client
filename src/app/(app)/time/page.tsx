import Loading from "@/app/(app)/loading"
import { getPostList } from "@/lib/post"
import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"

const TimePanel = dynamicImport(() => import("@/ui/time/time-panel"), {
  loading: () => <Loading></Loading>
})
const TimePosts = dynamicImport(() => import("@/ui/time/time-posts"), {
  loading: () => <Loading></Loading>
})
export default async function Time() {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return (
    <div className="flex flex-col gap-4">
      <div className="text-5xl font-extrabold">时间线</div>
      <div className="text-2xl font-medium">
        共有 <b className="text-highlight">{posts.length}</b> 篇文章，再接再厉
      </div>
      <span className="bg-highlight h-[1px] w-1/12"></span>
      <TimePanel></TimePanel>
      <TimePosts posts={posts}></TimePosts>
    </div>
  )
}
