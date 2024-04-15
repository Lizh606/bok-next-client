import { getAllPostSorts, getAllPosts } from "@/lib/posts"
import PostList from "@/ui/post/post-list"
export default function Posts() {
  const posts = getAllPosts()
  const sorts = getAllPostSorts()
  return <PostList posts={posts} sorts={sorts}></PostList>
}
