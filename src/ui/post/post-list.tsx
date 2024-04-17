"use client"

import type { PostInfo, SortInfo } from "@/lib/posts"
import { Divider } from "@nextui-org/react"
import Link from "next/link"
import PostCard from "./post-card"

export default function PostList({
  posts,
  sorts
}: {
  posts: PostInfo[]
  sorts: SortInfo[]
}) {
  return (
    <div className="m-auto grid grid-cols-4 gap-8 mt-8">
      <div className="col-span-3 flex flex-col gap-4">
        {posts?.map((post: PostInfo, i: number) => {
          return <PostCard post={post} index={i} key={i}></PostCard>
        })}
      </div>
      <div className="block">
        <div className="sticky top-24 flex flex-col gap-4">
          <div>文章分类</div>
          <Divider className="my-1"></Divider>
          {sorts.map((sort, i) => {
            return (
              <Link href={`/posts/${sort.sort}`} key={i}>
                <div className="underline-animation text-zinc-400 cursor-pointer text-highlight-hover">
                  {sort.sort}({sort.count})
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
