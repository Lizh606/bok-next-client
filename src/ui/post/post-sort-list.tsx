"use client"

import type { Post, SortInfo } from "@/lib/post"
import clsx from "clsx"
import Link from "next/link"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
export default function PostSortList({ posts }: { posts: Post[] }) {
  const sorts = useMemo(() => {
    const groupedBySort = posts.reduce((acc: Record<string, number>, item) => {
      acc[item.sort] = (acc[item.sort] || 0) + 1
      return acc
    }, {})

    return Object.entries(groupedBySort).map(([sort, count]) => ({
      sort,
      count
    })) as SortInfo[]
  }, [posts])
  const pathName = decodeURIComponent(usePathname())
  return (
    <>
      {sorts.map((sort, i) => {
        return (
          <Link href={`/posts/${sort.sort}`} key={i}>
            <div
              className={clsx(
                "inline-block cursor-pointer",
                pathName.includes(sort.sort)
                  ? "text-highlight border-b-solid border-b-2 border-highlight-light dark:border-highlight-dark"
                  : "text-highlight-hover underline-animation text-zinc-400 "
              )}
            >
              {sort.sort}({sort.count})
            </div>
          </Link>
        )
      })}
    </>
  )
}
