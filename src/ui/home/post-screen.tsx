import type { Locale } from "@/i18n/config"
import { getPostList } from "@/lib/post"
import PostScreenClient from "./post-screen-client"

type PostScreenProps = {
  title: string
  publishedAlt: string
  readMore: string
  readMoreAlt: string
  intro: string
  locale: Locale
}

export default async function PostScreen({
  title,
  publishedAlt,
  readMore,
  readMoreAlt,
  intro,
  locale
}: PostScreenProps) {
  const posts = await getPostList({ page: 1, size: 3, locale })

  return (
    <PostScreenClient
      title={title}
      publishedAlt={publishedAlt}
      readMore={readMore}
      readMoreAlt={readMoreAlt}
      intro={intro}
      posts={posts}
    />
  )
}
