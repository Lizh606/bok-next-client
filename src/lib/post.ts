import { http } from "@/utils/request"
export type PageResponse<T> = {
  data: T[]
  count: number
}
export type Post = {
  id?: number
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

export type SortInfo = {
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
}) => {
  const { data } = await http.get<PageResponse<Post>>({
    url: `posts/list?page=${page}&size=${size}${keyword ? `&keyword=${keyword}` : ""}`,
    cache: {
      key: `posts-list-${page}-${size}-${keyword || ""}`
    }
  })
  return data
}

export const getPostById = async (id: number) => {
  const data = await http.get<Post>({
    url: `posts/${id}`,
    cache: {
      key: `post-detail-${id}`
    }
  })
  return data
}
