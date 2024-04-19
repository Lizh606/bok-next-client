import { getAllPosts } from "@/lib/posts"
import type { Config } from "@/ui/home/Info-writer-animation"
import InfoWriterAnimation from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"
import PostHomeCard from "./post-home-card"

export default function PostScreen() {
  const postList = getAllPosts()
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: "积跬步，行千里",
          class: "text-4xl"
        }
      ]
    }
  } as Config
  return (
    <Screen className="mt-24">
      <div className="flex relative p-6">
        <div className="flex-1 min-w-0 flex items-center justify-center z-10 text-4xl font-bold tracking-widest">
          <InfoWriterAnimation config={config}></InfoWriterAnimation>
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <div className="flex flex-col gap-4">
            {postList
              .filter((post) => post.meta.tag)
              .splice(0, 4)
              .map((post, i) => {
                return (
                  <PostHomeCard post={post} key={i} index={i}></PostHomeCard>
                )
              })}
          </div>
        </div>
      </div>
    </Screen>
  )
}
