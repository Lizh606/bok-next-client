// import fs from "fs"
// import { basename, join, parse } from "path"

// import matter from "gray-matter"
// import { http } from "@/utils/request"

// const postsDir = join(process.cwd(), "posts")

// type MetaData = {
//   date: Date
//   tag: string
//   category: string
//   description?: string
//   draft?: boolean
// }
// export type Post = {
//   slug: string
//   meta: MetaData
//   href?: string
//   sort: string
//   content?: string
//   excerpt?: string
// }

// // 根据文件名读取 markdown 文档内容
// export function getPostBySlug(slug: string, sortPath: string): Post {
//   const path = join(postsDir, sortPath)
//   const realSlug = slug.replace(/\.md$/, "")
//   const fullPath = join(path, `${realSlug}.md`)
//   const fileContents = fs.readFileSync(fullPath, "utf8")
//   // 解析 markdown 元数据
//   const { data, content, excerpt } = matter(fileContents, {
//     excerpt: true
//   })

//   // 配置文章元数据
//   const meta = { ...data } as MetaData

//   return {
//     slug: realSlug,
//     meta,
//     content,
//     excerpt,
//     sort: sortPath
//   }
// }
// // 根据分类读取md文档列表
// export function getPostsBySort(sort: string) {
//   const sortPath = join(postsDir, decodeURIComponent(sort))
//   const slugs = fs.readdirSync(sortPath)

//   const posts = slugs
//     .map((slug) => getPostBySlug(slug, decodeURIComponent(sort)))
//     .filter((c) => !/\.draft$/.test(c.slug))
//   return posts.sort((a, b) => +b.meta.date - +a.meta.date)
// }
// export type SortInfo = {
//   sort: string
//   count: number
// }
// // 获取 /posts文件夹下所用markdown文档
// export function getAllPostSorts(): SortInfo[] {
//   const slugs = fs.readdirSync(postsDir)
//   const sorts = slugs.filter((slug) => {
//     const fullPath = join(postsDir, slug)
//     const stats = fs.statSync(fullPath)
//     return stats.isDirectory()
//   })

//   return sorts.map((sort) => {
//     return {
//       sort: sort,
//       count: getPostsBySort(sort).length
//     }
//   })
// }

// function readMarkdownFiles(
//   directoryPath: string,
//   filesList: Post[] = []
// ): Post[] {
//   // 获取文件夹下的所有文件
//   const files: string[] = fs.readdirSync(directoryPath)

//   files.forEach((file) => {
//     const filePath: string = join(directoryPath, file)
//     const fileStat: fs.Stats = fs.statSync(filePath)

//     if (fileStat.isDirectory()) {
//       // 如果是文件夹，则递归地读取该文件夹
//       readMarkdownFiles(filePath, filesList)
//     } else if (file.endsWith(".md")) {
//       // 如果是markdown文件，则将其路径添加到列表中
//       const fileBasename = basename(directoryPath)
//       const fileContents = fs.readFileSync(filePath, "utf8")
//       const realSlug = file.replace(/\.md$/, "")

//       // 解析 markdown 元数据
//       const { data } = matter(fileContents, {
//         excerpt: true
//       })

//       const meta = { ...data } as MetaData
//       const hrefName = parse(file).name
//       const href =
//         fileBasename === "posts"
//           ? `/posts/${hrefName}`
//           : `/posts/${fileBasename}/${hrefName}`
//       const sort = fileBasename === "posts" ? "未分类" : fileBasename
//       filesList.push({ href, meta, sort, slug: realSlug })
//     }
//   })

//   return filesList
// }

// export function getAllPosts() {
//   const files = readMarkdownFiles(postsDir)

//   return files.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
// }
