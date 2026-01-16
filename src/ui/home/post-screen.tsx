import type { Locale } from "@/i18n/config"
import { getPostList } from "@/lib/post"
import type { Config } from "@/ui/home/Info-writer-animation"
import InfoWriterAnimation from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"
import PostHomeCard from "./post-home-card"

type PostScreenProps = {
  title: string
  publishedAlt: string
  readMore: string
  readMoreAlt: string
  locale: Locale
}

export default async function PostScreen({
  title,
  publishedAlt,
  readMore,
  readMoreAlt,
  locale
}: PostScreenProps) {
  const posts = await getPostList({ page: 1, size: 3, locale })
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: title,
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
                  <PostHomeCard
                    post={post}
                    key={post.id}
                    index={i}
                    publishedAlt={publishedAlt}
                    readMore={readMore}
                    readMoreAlt={readMoreAlt}
                  ></PostHomeCard>
                )
              })}
          </div>
        </div>
      </div>
    </Screen>
  )
}
