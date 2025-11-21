import { getPostList } from "@/lib/post"
import type { Config } from "@/ui/home/Info-writer-animation"
import InfoWriterAnimation from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"
import PostHomeCard from "./post-home-card"
export default async function PostScreen() {
  const queryParams = { page: 1, size: 3 }
  const posts = await getPostList(queryParams)
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
      <div className="relative flex p-6">
        <div className="z-10 flex min-w-0 flex-1 items-center justify-center text-4xl font-bold tracking-widest">
          <InfoWriterAnimation config={config}></InfoWriterAnimation>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex flex-col gap-4">
            {posts
              .filter((post) => post.tag)
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
