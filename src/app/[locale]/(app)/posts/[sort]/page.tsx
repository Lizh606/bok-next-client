import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
import { notFound } from "next/navigation"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"

export const revalidate = 1800

export async function generateStaticParams() {
  const posts = await getPostList({ page: 1, size: 999 })
  const sorts = Array.from(
    new Set(posts.map((post) => post.sort).filter(Boolean))
  )
  return sorts.map((sort) => ({ sort }))
}

type Props = {
  params: Promise<{ locale: Locale; sort: string }>
}

export default async function Sort(props: Props) {
  const params = await props.params
  const dictionary = await getDictionary(params.locale)
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  const postsBySort = posts.filter(
    (post) => post.sort === decodeURIComponent(params.sort)
  )

  if (postsBySort.length === 0) {
    notFound()
  }
  return (
    <PostList
      posts={postsBySort}
      allPosts={posts}
      locale={params.locale}
      searchPlaceholder={dictionary.posts.searchPlaceholder}
      searchAlt={dictionary.posts.searchAlt}
      categoriesLabel={dictionary.posts.categoriesLabel}
      readMore={dictionary.posts.readMore}
      readMoreAlt={dictionary.posts.readMoreAlt}
    ></PostList>
  )
}
