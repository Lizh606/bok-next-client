import type { Locale } from "@/i18n/config"
import { buildLocaleParam } from "@/lib/strapi"
import { cmsHttp } from "@/utils/request"

export type SiteGrowthEvent = {
  date: string
  event: string
  type: string
  icon?: string
  milestone?: boolean
  order?: number
  link?: string
}

type StrapiGrowthAttributes = {
  title?: string
  event?: string
  date?: string
  type?: string
  icon?: string
  milestone?: boolean
  order?: number
  link?: string
}

type StrapiGrowthItem = {
  id?: number
  attributes?: StrapiGrowthAttributes
} & StrapiGrowthAttributes

const unwrapStrapiList = (response: any): StrapiGrowthItem[] => {
  if (!response) return []
  if (Array.isArray(response)) return response
  if (Array.isArray(response.data)) return response.data
  if (Array.isArray(response?.data?.data)) return response.data.data
  return []
}

const mapGrowth = (item: StrapiGrowthItem): SiteGrowthEvent | null => {
  const attrs = item?.attributes ?? item ?? {}
  const date = attrs.date ?? ""
  const event = attrs.title ?? attrs.event ?? ""
  const type = attrs.type ?? ""
  if (!date || !event || !type) return null
  return {
    date,
    event,
    type,
    icon: attrs.icon ?? undefined,
    milestone: Boolean(attrs.milestone),
    order:
      typeof attrs.order === "number" && Number.isFinite(attrs.order)
        ? attrs.order
        : undefined,
    link: attrs.link ?? undefined
  }
}

export const getSiteGrowthList = async (locale?: Locale) => {
  const params = [
    "pagination[pageSize]=100",
    "sort[0]=order:asc",
    "sort[1]=date:desc",
    buildLocaleParam(locale),
    "fields[0]=title",
    "fields[1]=date",
    "fields[2]=type",
    "fields[3]=icon",
    "fields[4]=milestone",
    "fields[5]=order",
    "fields[6]=link"
  ]
    .filter(Boolean)
    .join("&")

  const response = await cmsHttp.get<any>({
    url: `site-growths?${params}`,
    cache: {
      enabled: false
    }
  })
  const list = unwrapStrapiList(response)

  return list
    .map(mapGrowth)
    .filter((item): item is SiteGrowthEvent => Boolean(item))
}
