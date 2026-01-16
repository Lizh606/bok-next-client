import { cmsHttp } from "@/utils/request"

type StrapiMediaFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

type StrapiMediaFormats = Record<string, StrapiMediaFormat>

type StrapiMediaAttributes = {
  url?: string | null
  name?: string
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  formats?: StrapiMediaFormats | null
  provider_metadata?: Record<string, unknown>
}

type StrapiMediaFile = {
  id: number
  attributes?: StrapiMediaAttributes | null
  url?: string | null
  name?: string
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  formats?: StrapiMediaFormats | null
}

const unwrapStrapiSingle = <T>(
  response: T | { data: T } | T[] | null
): T | null => {
  if (!response) return null
  if (Array.isArray(response)) {
    return (response[0] as T) ?? null
  }
  if (typeof response === "object" && response !== null && "data" in response) {
    const data = (response as { data: T | T[] }).data
    if (Array.isArray(data)) {
      return (data[0] as T) ?? null
    }
    return (data as T) ?? null
  }
  return response as T
}

const buildMediaUrl = (rawUrl?: string | null) => {
  if (!rawUrl) return undefined
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl
  }
  const apiBase =
    process.env.NEXT_PUBLIC_CMS_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? ""
  if (!apiBase) {
    return rawUrl
  }
  const normalizedBase = apiBase.replace(/\/api\/?$/, "")
  const trimmedBase = normalizedBase.replace(/\/+$/, "")
  const path = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`
  return `${trimmedBase}${path}`
}

export const resolveAvatarMediaId = () => {
  const raw = process.env.BOK_AVATAR_MEDIA_ID
  const id = Number(raw)
  if (!Number.isFinite(id) || id <= 0) {
    return 1
  }
  return id
}

export type MediaFile = {
  id: number
  name?: string
  alt?: string | null
  url: string
  width?: number
  height?: number
  formats?: StrapiMediaFormats | null
}

export const getMediaFile = async (id: number): Promise<MediaFile | null> => {
  const response = await cmsHttp.get<StrapiMediaFile>({
    url: `upload/files/${id}`,
    cache: {
      enabled: false
    }
  })
  const file = unwrapStrapiSingle<StrapiMediaFile>(response)
  if (!file?.id) {
    return null
  }
  const attributes: StrapiMediaAttributes = file.attributes ?? {
    url: file.url,
    name: file.name,
    alternativeText: file.alternativeText,
    caption: file.caption,
    width: file.width,
    height: file.height,
    formats: file.formats
  }
  if (!attributes.url) {
    return null
  }
  const url = buildMediaUrl(attributes.url)
  if (!url) {
    return null
  }
  return {
    id: file.id,
    name: attributes.name,
    alt:
      attributes.alternativeText ??
      attributes.caption ??
      attributes.name ??
      null,
    url,
    width: attributes.width,
    height: attributes.height,
    formats: attributes.formats
  }
}
