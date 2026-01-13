import type { Locale } from "@/i18n/config"
import { buildLocaleParam } from "@/lib/strapi"
import { cmsHttp } from "@/utils/request"

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

type StrapiItemResponse<T> = {
  data: T
}

type StrapiArticle = {
  id: number
  title: string
  content: string
  tag?: string
  sort?: string
  date?: string
  description?: string
  documentId?: string
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

export type SortInfo = {
  sort: string
  count: number
}

const selectedFields = [
  "title",
  "tag",
  "sort",
  "date",
  "description",
  "documentId"
]
const buildFieldsQuery = () =>
  selectedFields.map(
    (field, index) => `fields[${index}]=${encodeURIComponent(field)}`
  )

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
}) => {
  const params = [
    `pagination[page]=${page}`,
    `pagination[pageSize]=${size}`,
    "sort[0]=date:desc",
    keyword ? `filters[title][$containsi]=${encodeURIComponent(keyword)}` : "",
    buildLocaleParam(locale)
  ]
    .filter(Boolean)
    .join("&")

  const response = await cmsHttp.get<StrapiListResponse<StrapiArticle> | any>({
    url: `articles?${params}`,
    cache: {
      enabled: false
    }
  })
  const list = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.data?.data)
      ? response.data.data
      : []
  return list.map(mapArticleToPost)
}

export const getPostById = async (
  documentId: string | number,
  locale?: Locale,
  isDraft?: boolean
) => {
  const docId = String(documentId)

  // Robust filtering: only use numeric 'id' filter if docId is actually a number
  const isNumeric = /^\d+$/.test(docId)
  let filters = `filters[documentId][$eq]=${encodeURIComponent(docId)}`
  if (isNumeric) {
    filters = `filters[$or][0][documentId][$eq]=${encodeURIComponent(docId)}&filters[$or][1][id][$eq]=${encodeURIComponent(docId)}`
  }

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

  const response = await cmsHttp.get<StrapiListResponse<StrapiArticle> | any>({
    url: fullUrl,
    cache: {
      enabled: false,
      key: `post-detail-${docId}`
    }
  })
  const item = Array.isArray(response?.data)
    ? response.data[0]
    : Array.isArray(response?.data?.data)
      ? response.data.data[0]
      : null
  if (!item) {
    throw new Error(`article ${documentId} not found`)
  }
  return mapArticleToPost(item)
}
