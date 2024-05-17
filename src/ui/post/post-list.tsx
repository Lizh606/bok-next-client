"use client"

import { getPostList, type Post } from "@/lib/post"
import { Divider, Input } from "@nextui-org/react"
import { debounce } from "lodash"
import { useState } from "react"
import SearchIcon from "~/svgs/搜索.svg"
import PostCard from "./post-card"
import PostSortList from "./post-sort-list"
export default function PostList({
  posts,
  allPosts
}: {
  posts: Post[]
  allPosts?: Post[]
}) {
  const [showPosts, setShowPosts] = useState(posts)
  return (
    <div className="m-auto grid grid-cols-4 gap-8 mt-8">
      <div className="col-span-3 flex flex-col gap-4">
        {showPosts?.map((post: Post, i: number) => {
          return <PostCard post={post} index={i} key={i}></PostCard>
        })}
      </div>
      <div className="block">
        <div className="sticky top-24 flex flex-col gap-4">
          <Input
            classNames={{
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full text-default-300 bg-default-400/10 dark:bg-default-500/20 hover:bg-default-400/20"
            }}
            placeholder="搜索文章"
            startContent={<SearchIcon size="18" className="p-1" />}
            type="search"
            onValueChange={debounce(async (value) => {
              const params = {
                page: 1,
                size: 99,
                keyword: value
              }
              const postList = await getPostList(params)
              setShowPosts(postList)
            }, 500)}
          />
          <span>文章分类</span>
          <Divider className="my-1"></Divider>
          <PostSortList posts={allPosts ? allPosts : posts}></PostSortList>
        </div>
      </div>
    </div>
  )
}
