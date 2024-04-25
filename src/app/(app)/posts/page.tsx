import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
export default async function Posts() {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return <PostList posts={posts}></PostList>
}
