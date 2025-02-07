"use client"
import type { Post } from "@/lib/post"
import Link from "next/link"

export default function TimePosts({ posts }: { posts: Post[] }) {
  posts.forEach((i) => {
    // 解析日期字符串
    const date = new Date(i.date)

    // 获取年份
    i.year = date.getFullYear()

    // 获取月份（注意：月份从0开始，所以需要加1）
    i.month = String(date.getMonth() + 1).padStart(2, "0")

    // 获取日期
    i.day = String(date.getDate()).padStart(2, "0")
  })
  const groupedByYear = posts.reduce<{ [key: number]: Post[] }>((acc, item) => {
    // 检查年是否已经存在于累加器中
    if (item.year && !acc[item.year]) {
      acc[item.year] = [] // 初始化一个新的数组
    }
    item.year && acc[item.year].push(item) // 将当前项推入对应的数组
    return acc
  }, {})

  return (
    <div className="mt-16 flex flex-col gap-8">
      {Object.entries(groupedByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, items]) => (
          <div key={year}>
            <div className="mb-8 flex items-center">
              <span className="text-4xl font-extrabold tracking-wider text-highlight-light dark:text-highlight-dark">
                {year}
              </span>
              <div className="ml-4 h-[1px] flex-1 bg-highlight-light dark:bg-highlight-dark"></div>
            </div>

            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="timeline flex w-full items-center justify-between pl-4"
                >
                  <Link
                    href={`/posts/${item.sort}/${item.id}`}
                    className="flex cursor-pointer items-center"
                  >
                    <div className="flex items-center gap-4">
                      {/* <span className="h-2 w-2 rounded-full bg-highlight-light dark:bg-highlight-dark"></span> */}
                      <span className="tracking-wide">
                        {item.month}/{item.day}
                      </span>
                      <span className="text-highlight-hover underline-animation">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                  <div>
                    {item.tag} | {item.sort}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}
