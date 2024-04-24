"use client"

import type { Post } from "@/lib/post"
import { Divider } from "@nextui-org/react"
import PostCard from "./post-card"
import PostSortList from "./post-sort-list"

export default function PostList({
  posts,
  allPosts
}: {
  posts: Post[]
  allPosts?: Post[]
}) {
  return (
    <div className="m-auto grid grid-cols-4 gap-8 mt-8">
      <div className="col-span-3 flex flex-col gap-4">
        {posts?.map((post: Post, i: number) => {
          return <PostCard post={post} index={i} key={i}></PostCard>
        })}
      </div>
      <div className="block">
        <div className="sticky top-24 flex flex-col gap-4">
          <div>文章分类</div>
          <Divider className="my-1"></Divider>
          <PostSortList posts={allPosts ? allPosts : posts}></PostSortList>
        </div>
      </div>
    </div>
  )
}
