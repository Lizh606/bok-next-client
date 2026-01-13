import type { Locale } from "@/i18n/config"

const normalizeUrl = (value?: string) => {
  if (!value) return ""
  return value.endsWith("/") ? value : `${value}/`
}

const cmsBase =
  normalizeUrl(process.env.NEXT_PUBLIC_CMS_API_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ||
  ""

export const strapiLocaleMap: Record<Locale, string> = {
  zh: "zh-Hans",
  en: "en"
}

export const resolveStrapiLocale = (locale?: Locale) => {
  if (!locale) return undefined
  return strapiLocaleMap[locale] ?? locale
}

export const buildLocaleParam = (locale?: Locale) => {
  const code = resolveStrapiLocale(locale)
  if (!code) return ""
  return `locale=${encodeURIComponent(code)}`
}

export const getStrapiBaseUrl = () => cmsBase

export const getStrapiHeaders = () => {
  const cmsApiToken = process.env.NEXT_PUBLIC_CMS_API_TOKEN
  if (!cmsApiToken) return undefined
  return {
    Authorization: `Bearer ${cmsApiToken}`
  }
}
