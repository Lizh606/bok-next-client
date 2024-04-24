import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
export default async function Posts() {
  const posts = await getPostList()
  return <PostList posts={posts}></PostList>
}
