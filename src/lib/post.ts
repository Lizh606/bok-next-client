import type { Locale } from "@/i18n/config"
import { buildLocaleParam } from "@/lib/strapi"
import { cmsHttp } from "@/utils/request"

export type Post = {
  id: string
  title: string
  content: string
  tag: string
  sort: string
  date: string
  description: string
  year?: number
  month?: number | string
  day?: number | string
  strapiId?: number
}

type StrapiListResponse<T> = {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Support both Strapi v4 and v5 (documentId) formats
type StrapiArticle = {
  id: number
  documentId?: string
  title: string
  content: string
  tag?: string
  sort?: string
  date?: string
  description?: string
}

const mapArticleToPost = (article: StrapiArticle): Post => ({
  id: article.documentId ?? String(article.id),
  title: article.title,
  content: article.content,
  tag: article.tag || "",
  sort: article.sort || "",
  date: article.date || "",
  description: article.description || "",
  strapiId: article.id
})

export type SortInfo = {
  sort: string
  count: number
}

export const getPostList = async ({
  page,
  size,
  keyword,
  locale
}: {
  page: number
  size: number
  keyword?: string
  locale?: Locale
}): Promise<Post[]> => {
  const params = [
    `pagination[page]=${page}`,
    `pagination[pageSize]=${size}`,
    "sort[0]=date:desc",
    keyword ? `filters[title][$containsi]=${encodeURIComponent(keyword)}` : "",
    buildLocaleParam(locale)
  ]
    .filter(Boolean)
    .join("&")

  const response = await cmsHttp.get<StrapiListResponse<StrapiArticle>>({
    url: `articles?${params}`,
    cache: {
      enabled: false
    }
  })

  // Strapi v4/v5 data structure normalization
  const data = response
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : []

  return list.map(mapArticleToPost)
}

export const getPostById = async (
  documentId: string | number,
  locale?: Locale,
  isDraft?: boolean
): Promise<Post> => {
  const docId = String(documentId)
  // Strapi v5 推荐直接通过 documentId 匹配，移除复杂的 $or 逻辑以防后端报错
  const filters = `filters[documentId][$eq]=${encodeURIComponent(docId)}`

  const localeParam = buildLocaleParam(locale)
  const params = [
    "pagination[page]=1",
    "pagination[pageSize]=1",
    filters,
    localeParam,
    isDraft ? "status=preview&publicationState=preview" : ""
  ]
    .filter(Boolean)
    .join("&")

  const fullUrl = `articles?${params}`
  console.log("Fetching post from Strapi:", fullUrl)

  const response = await cmsHttp.get<StrapiListResponse<StrapiArticle>>({
    url: fullUrl,
    cache: {
      enabled: false,
      key: `post-detail-${docId}`
    }
  })

  const data = response
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : []
  const item = list[0]

  if (!item) {
    console.warn(`article ${documentId} not found, returning default data`)
    return {
      id: String(documentId),
      title: "Post Not Found",
      content: "The content of this post is not available.",
      tag: "None",
      sort: "None",
      date: new Date().toISOString(),
      description: "Fallback data for missing article."
    }
  }
  return mapArticleToPost(item)
}
