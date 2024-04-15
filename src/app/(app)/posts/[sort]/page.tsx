import { getAllPostSorts, getAllPosts } from "@/lib/posts"
import PostList from "@/ui/post/post-list"

type Props = {
  params: { sort: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Sort({ params }: Props) {
  const posts = getAllPosts().filter(
    (post) => post.sort === decodeURIComponent(params.sort)
  )

  const sorts = getAllPostSorts()
  return (
    <>
      {posts.length > 0 ? (
        <PostList posts={posts} sorts={sorts}></PostList>
      ) : (
        <span>暂无数据或文章未分类！</span>
      )}
    </>
  )
}
