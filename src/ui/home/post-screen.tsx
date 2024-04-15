import { getAllPosts } from "@/lib/posts"
import PostHomeCard from "./post-home-card"

export default function PostScreen() {
  const postList = getAllPosts()
  return (
    <div className="h-screen flex relative px-6">
      <div className="flex-1 min-w-0 flex items-center justify-center z-10 text-4xl font-bold tracking-widest">
        积跬步，行千里
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-center">
        <div className="flex flex-col gap-4">
          {postList.splice(0, 4).map((post, i) => {
            return <PostHomeCard post={post} key={i} index={i}></PostHomeCard>
          })}
        </div>
      </div>
    </div>
  )
}
