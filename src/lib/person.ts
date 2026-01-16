import type { Locale } from "@/i18n/config"
import {
  getStrapiBaseUrl,
  getStrapiHeaders,
  resolveStrapiLocale
} from "@/lib/strapi"

type StrapiPersonAttributes = {
  title?: string | null
  role?: string | null
  intro?: string | null
  nameLabel?: string | null
  nameValue?: string | null
  locationLabel?: string | null
  locationValue?: string | null
  hometownLabel?: string | null
  hometownValue?: string | null
  bioLabel?: string | null
  bioValue?: string | null
  skillsLabel?: string | null
  skills?: string[] | null
  workLabel?: string | null
  work?: Array<{
    range?: string | null
    company?: string | null
  }> | null
  giscusTitle?: string | null
  quotes?: Array<{
    text?: string | null
    singer?: string | null
  }> | null
  data?: StrapiPersonAttributes | null
}

type StrapiPersonData = StrapiPersonAttributes & {
  id?: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  locale?: string
}

type StrapiPersonSingle = {
  data?: StrapiPersonData | null
  meta?: Record<string, unknown>
}

type Candidate =
  | StrapiPersonSingle
  | StrapiPersonData
  | StrapiPersonAttributes
  | null
const extractAttributes = (raw: Candidate): StrapiPersonAttributes | null => {
  if (!raw) return null
  const candidate: Candidate = Array.isArray(raw) ? (raw[0] ?? null) : raw
  if (!candidate) return null
  if ("data" in candidate) {
    return extractAttributes(candidate.data ?? null)
  }
  if ("attributes" in candidate) {
    return extractAttributes(candidate.attributes ?? null)
  }
  return resolveAttributes(candidate as StrapiPersonAttributes)
}
const resolveAttributes = (
  attributes?: StrapiPersonAttributes | null
): StrapiPersonAttributes | null => {
  if (!attributes) return null
  if (attributes.data) {
    return resolveAttributes(attributes.data)
  }
  return attributes
}

export type PersonProfile = {
  title: string
  role: string
  intro: string
  nameLabel: string
  nameValue: string
  locationLabel: string
  locationValue: string
  hometownLabel: string
  hometownValue: string
  bioLabel: string
  bioValue: string
  skillsLabel: string
  skills: string[]
  workLabel: string
  work: Array<{
    range: string
    company: string
  }>
  giscusTitle: string
  quotes: Array<{
    text: string
    singer: string
  }>
}

const toProfile = (attributes: StrapiPersonAttributes): PersonProfile => ({
  title: attributes.title ?? "",
  role: attributes.role ?? "",
  intro: attributes.intro ?? "",
  nameLabel: attributes.nameLabel ?? "",
  nameValue: attributes.nameValue ?? "",
  locationLabel: attributes.locationLabel ?? "",
  locationValue: attributes.locationValue ?? "",
  hometownLabel: attributes.hometownLabel ?? "",
  hometownValue: attributes.hometownValue ?? "",
  bioLabel: attributes.bioLabel ?? "",
  bioValue: attributes.bioValue ?? "",
  skillsLabel: attributes.skillsLabel ?? "",
  skills: Array.isArray(attributes.skills)
    ? attributes.skills.filter(Boolean)
    : [],
  workLabel: attributes.workLabel ?? "",
  work: Array.isArray(attributes.work)
    ? attributes.work.map((item) => ({
        range: item?.range ?? "",
        company: item?.company ?? ""
      }))
    : [],
  giscusTitle: attributes.giscusTitle ?? "",
  quotes: Array.isArray(attributes.quotes)
    ? attributes.quotes.map((item) => ({
        text: item?.text ?? "",
        singer: item?.singer ?? ""
      }))
    : []
})

const parseJsonSafely = async (response: Response) => {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch (error) {
    console.warn("fetchPersonProfile: failed to parse Strapi response", text)
    return null
  }
}

export const fetchPersonProfile = async (
  locale?: Locale
): Promise<PersonProfile | null> => {
  const baseUrl = getStrapiBaseUrl()
  if (!baseUrl) {
    return null
  }

  const localeCode = resolveStrapiLocale(locale)
  const url = new URL("person", baseUrl)
  if (localeCode) {
    url.searchParams.set("locale", localeCode)
  }
  try {
    const response = await fetch(url.toString(), {
      headers: getStrapiHeaders(),
      cache: "no-store"
    })

    const payload = await parseJsonSafely(response)
    const attributes = extractAttributes(payload)
    if (!attributes) {
      return null
    }
    return toProfile(attributes)
  } catch (error) {
    console.warn("fetchPersonProfile: request failed", error)
    return null
  }
}
