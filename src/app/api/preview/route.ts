import type { Locale } from "@/i18n/config"
import { getPostById } from "@/lib/post"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

// Helper to detect Next.js redirect errors
const isRedirectError = (error: unknown): boolean =>
  !!(
    error &&
    typeof error === "object" &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  )

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")
  let sort = searchParams.get("sort")

  // Check the secret
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!slug || slug === "undefined") {
    return new Response("Missing slug param", { status: 401 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Map Strapi locale back to Next.js locale
  const strapiToNextLocale: Record<string, Locale> = {
    "zh-Hans": "zh",
    zh: "zh",
    en: "en"
  }

  const rawLocale = searchParams.get("locale") || "zh"
  const locale = strapiToNextLocale[rawLocale] || "zh"

  // If sort is missing, we must fetch the post to know where to redirect
  if (!sort) {
    try {
      const post = await getPostById(slug, locale, true)
      sort = post.sort
      // Always redirect to the formal documentId if we found the post
      const finalId = post.id || slug
      const redirectUrl = `/${encodeURIComponent(locale)}/posts/${encodeURIComponent(sort)}/${encodeURIComponent(finalId)}`
      redirect(redirectUrl)
    } catch (error: unknown) {
      if (isRedirectError(error)) throw error
      console.error("Failed to fetch post for preview redirection", error)
      const message = error instanceof Error ? error.message : "Unknown error"
      return new Response(
        `Failed to fetch post for preview: ${message}. Slug: ${slug}, Locale: ${locale}`,
        {
          status: 500
        }
      )
    }
  }

  // Generic redirect if sort was already provided
  const finalPath = `/${encodeURIComponent(locale)}/posts/${encodeURIComponent(sort || "")}/${encodeURIComponent(slug)}`
  redirect(finalPath)
}
