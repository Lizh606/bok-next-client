import en from "./dictionaries/en.json"
import zh from "./dictionaries/zh.json"
import type { Locale } from "./config"

const dictionaries = {
  en,
  zh
} as const

export function getClientDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.zh
}
