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
export const getPostList = async () => {
  const { data } = await http.get<PageResponse<Post>>({
    url: `posts?page=1&size=10`
  })
  return data
}

export const getPostById = async (id: number) => {
  const data = await http.get<Post>({
    url: `posts/${id}`
  })
  return data
}
