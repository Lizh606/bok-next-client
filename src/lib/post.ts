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
}

export type SortInfo = {
  sort: string
  count: number
}
export const getPostList = async ({
  page,
  size
}: {
  page: number
  size: number
}) => {
  const { data } = await http.get<PageResponse<Post>>({
    url: `posts?page=${page}&size=${size}`
  })
  return data
}

export const getPostById = async (id: number) => {
  const data = await http.get<Post>({
    url: `posts/${id}`
  })
  return data
}
