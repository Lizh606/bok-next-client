import type { Post } from "@/lib/post"
import Link from "next/link"

export default function TimePosts({ posts }: { posts: Post[] }) {
  posts.forEach((i) => {
    // 解析日期字符串
    const date = new Date(i.date)

    // 获取年份
    i.year = date.getFullYear()

    // 获取月份（注意：月份从0开始，所以需要加1）
    i.month = date.getMonth() + 1

    // 获取日期
    i.day = date.getDate()
  })
  const groupedByYear = posts.reduce<{ [key: number]: Post[] }>((acc, item) => {
    // 检查年是否已经存在于累加器中
    if (item.year && !acc[item.year]) {
      acc[item.year] = [] // 初始化一个新的数组
    }
    item.year && acc[item.year].push(item) // 将当前项推入对应的数组
    return acc
  }, {})
  console.log(groupedByYear)

  return (
    <div className="mt-20 flex flex-col gap-6">
      {Object.entries(groupedByYear).map(([year, items]) => (
        <div key={year}>
          <div className="mb-4 border-l-3 border-solid border-highlight-light pl-2 text-xl font-bold dark:border-highlight-dark">
            {year}
          </div>

          <ul>
            {items.map((item, index) => (
              <Link
                href={`/posts/${item.sort}/${item.id}`}
                key={index}
                className="mb-4 flex cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-highlight-light dark:bg-highlight-dark"></span>
                  <span>
                    {item.month}/{item.day}
                  </span>
                  <span>{item.title}</span>
                </div>
                <div>
                  {item.tag} | {item.sort}
                </div>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
