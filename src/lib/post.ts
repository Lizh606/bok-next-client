import { http } from "@/utils/request"

export interface PageResponse<T> {
  data: T[]
  count: number
}

export interface Post {
  id: number
  title: string
  content: string
  tag: string
  sort: string
  date: string
  description: string
  year?: number
  month?: number | string
  day?: number | string
}

export interface SortInfo {
  sort: string
  count: number
}

export const getPostList = async ({
  page,
  size,
  keyword
}: {
  page: number
  size: number
  keyword?: string
}): Promise<Post[]> => {
  const response = await http.get<PageResponse<Post>>({
    url: `posts/list?page=${page}&size=${size}${keyword ? `&keyword=${keyword}` : ""}`,
    cache: {
      key: `posts-list-${page}-${size}-${keyword || ""}`
    }
  })
  return response.data
}

export const getPostById = async (id: number): Promise<Post | null> => {
  try {
    const data = await http.get<Post>({
      url: `posts/${id}`,
      cache: {
        key: `post-detail-${id}`
      }
    })
    return data
  } catch (error) {
    console.error(`获取文章 ${id} 失败:`, error)
    return null
  }
}
