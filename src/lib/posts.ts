import fs from "fs"
import { join } from "path"

import matter from "gray-matter"

const postsDir = join(process.cwd(), "posts")

type MetaData = {
  title: string
  date: Date
  tag: string
  category: string
  description?: string
  draft?: boolean
}
export type Post = {
  slug: string
  meta: MetaData
  content: string
  excerpt?: string
}
// 根据文件名读取 markdown 文档内容
export function getPostBySlug(slug: string, sortPath: string): Post {
  const path = join(postsDir, sortPath)
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(path, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  // 解析 markdown 元数据
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true
  })

  // const processedContent = await remark().use(html).processSync(content)

  // const contentHtml = processedContent.toString()
  // 配置文章元数据
  const meta = { ...data } as MetaData

  return {
    slug: realSlug,
    meta,
    content,
    excerpt
    // contentHtml
  }
}
// 根据分类读取md文档列表
export function getPostsBySort(sort: string) {
  const sortPath = join(postsDir, decodeURIComponent(sort))
  const slugs = fs.readdirSync(sortPath)

  const posts = slugs
    .map((slug) => getPostBySlug(slug, decodeURIComponent(sort)))
    .filter((c) => !/\.draft$/.test(c.slug))
  return posts.sort((a, b) => +b.meta.date - +a.meta.date)
}
// 获取 /posts文件夹下所用markdown文档
export function getAllPostSorts() {
  const slugs = fs.readdirSync(postsDir)
  const posts = slugs.filter((slug) => {
    const fullPath = join(postsDir, slug)
    const stats = fs.statSync(fullPath)
    return stats.isDirectory()
  })

  // // 排除草稿文件
  // const posts = slugs
  //   .map((slug) => getPostBySlug(slug))
  //   .filter((c) => !/\.draft$/.test(c.slug))
  return posts
  // return posts.sort((a, b) => +b.meta.date - +a.meta.date)
}
