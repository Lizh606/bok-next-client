import type { Locale } from "./config"

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case "zh":
      return (await import("./dictionaries/zh.json")).default
    case "en":
    default:
      return (await import("./dictionaries/en.json")).default
  }
}
