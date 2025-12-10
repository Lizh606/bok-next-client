import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ sort: string }>
  // searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Sort(props: Props) {
  const params = await props.params;
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
