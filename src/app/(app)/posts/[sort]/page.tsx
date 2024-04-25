import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
import { notFound } from "next/navigation"

type Props = {
  params: { sort: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Sort({ params }: Props) {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  const postsBySort = posts.filter(
    (post) => post.sort === decodeURIComponent(params.sort)
  )

  if (postsBySort.length === 0) {
    notFound()
  }
  return <PostList posts={postsBySort} allPosts={posts}></PostList>
}
