import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"

export const revalidate = 1800

export default async function Posts({
  params
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return (
    <PostList
      posts={posts}
      locale={locale}
      searchPlaceholder={dictionary.posts.searchPlaceholder}
      searchAlt={dictionary.posts.searchAlt}
      categoriesLabel={dictionary.posts.categoriesLabel}
      readMore={dictionary.posts.readMore}
      readMoreAlt={dictionary.posts.readMoreAlt}
    ></PostList>
  )
}
