"use client"

import { getPostList, type Post } from "@/lib/post"
import { Divider, Input } from "@heroui/react"
import { debounce } from "lodash"
import Image from "next/image"
import { useState } from "react"
import PostCard from "./post-card"
import PostSortList from "./post-sort-list"
import type { Locale } from "@/i18n/config"
export default function PostList({
  posts,
  allPosts,
  locale,
  searchPlaceholder,
  searchAlt,
  categoriesLabel,
  readMore,
  readMoreAlt
}: {
  posts: Post[]
  allPosts?: Post[]
  locale: Locale
  searchPlaceholder: string
  searchAlt: string
  categoriesLabel: string
  readMore: string
  readMoreAlt: string
}) {
  const [showPosts, setShowPosts] = useState(posts)
  return (
    <div className="m-auto grid grid-cols-4 gap-8 mt-8">
      <div className="col-span-3 flex flex-col gap-4">
        {showPosts?.map((post: Post, i: number) => {
          return (
            <PostCard
              post={post}
              index={i}
              key={i}
              locale={locale}
              readMore={readMore}
              readMoreAlt={readMoreAlt}
            ></PostCard>
          )
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
            placeholder={searchPlaceholder}
            startContent={
              <Image
                src="/svgs/search.svg"
                alt={searchAlt}
                width={18}
                height={18}
                className="p-1"
                priority
              />
            }
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
          <span>{categoriesLabel}</span>
          <Divider className="my-1"></Divider>
          <PostSortList
            posts={allPosts ? allPosts : posts}
            locale={locale}
          ></PostSortList>
        </div>
      </div>
    </div>
  )
}
