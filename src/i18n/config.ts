export const locales = ["zh", "en"] as const
export const defaultLocale = "zh" as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
