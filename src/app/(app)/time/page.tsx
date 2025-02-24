import { getPostList } from "@/lib/post"
import dynamic from "next/dynamic"

const TimePanel = dynamic(() => import("@/ui/time/time-panel"), {
  loading: () => <div>加载中...</div>
})
const TimePosts = dynamic(() => import("@/ui/time/time-posts"), {
  loading: () => <div>加载中...</div>
})
export default async function Time() {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return (
    <div className="flex flex-col gap-4">
      <div className="text-5xl font-extrabold">时间线</div>
      <div className="text-2xl font-medium">
        共有 <b className="text-red-500">{posts.length}</b> 篇文章，再接再厉
      </div>
      <span className="h-[1px] w-1/12 bg-highlight-light dark:bg-highlight-dark"></span>
      <TimePanel></TimePanel>
      <TimePosts posts={posts}></TimePosts>
    </div>
  )
}
