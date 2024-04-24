import type { Post, SortInfo } from "@/lib/post"
import Link from "next/link"

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
  return (
    <>
      {sorts.map((sort, i) => {
        return (
          <Link href={`/posts/${sort.sort}`} key={i}>
            <div className="underline-animation text-zinc-400 cursor-pointer text-highlight-hover">
              {sort.sort}({sort.count})
            </div>
          </Link>
        )
      })}
    </>
  )
}
