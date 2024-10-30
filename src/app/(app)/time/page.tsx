import { getPostList } from "@/lib/post"
import TimePanel from "@/ui/time/time-panel"
import TimePosts from "@/ui/time/time-posts"

export default async function Time() {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl font-extrabold">时间线</div>
      <div className="text-2xl font-medium">
        共有 {posts.length} 篇文章，再接再厉
      </div>
      <span className="h-[1px] w-1/12  bg-highlight-light dark:bg-highlight-dark"></span>
      <TimePanel></TimePanel>
      <TimePosts posts={posts}></TimePosts>
    </div>
  )
}
