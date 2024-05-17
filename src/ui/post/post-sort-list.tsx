import type { Post, SortInfo } from "@/lib/post"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default async function PostSortList({ posts }: { posts: Post[] }) {
  const sorts: SortInfo[] = []
  const groupedBySort = posts.reduce((acc: any, item) => {
    if (!acc[item.sort]) {
      acc[item.sort] = 0
    }
    acc[item.sort]++
    return acc
  }, {})
  const keys = Object.keys(groupedBySort)
  for (const key of keys) {
    const sortInfo = {
      sort: key,
      count: groupedBySort[key]
    }
    sorts.push(sortInfo)
  }
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
