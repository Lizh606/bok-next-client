import { getPostList } from "@/lib/post"
import PostList from "@/ui/post/post-list"
export default async function Posts() {
  const queryParams = { page: 1, size: 999 }
  const posts = await getPostList(queryParams)
  return <PostList posts={posts}></PostList>
}
// // 此函数在构建时被调用
// export async function getStaticProps() {
//   // 调用外部 API 获取博文列表
//   const queryParams = { page: 1, size: 999 }
//   const posts = await getPostList(queryParams)

//   return {
//     props: {
//       posts
//     }
//   }
// }
