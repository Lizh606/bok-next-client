import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"

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
  return (
    <>
      {posts.length > 0 ? (
        <PostList posts={postsBySort} allPosts={posts}></PostList>
      ) : (
        <span>暂无数据或文章未分类！</span>
      )}
    </>
  )
}
