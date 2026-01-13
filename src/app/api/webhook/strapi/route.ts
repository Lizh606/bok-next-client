import { locales } from "@/i18n/config"
import { contentState } from "@/lib/content-state"
import type { StrapiArticleEntry, StrapiWebhookPayload } from "@/types/strapi"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const secretHeader = request.headers.get("x-strapi-webhook-secret")
  const expectedSecret = process.env.STRAPI_WEBHOOK_SECRET

  if (!secretHeader || !expectedSecret || secretHeader !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid webhook secret" },
      { status: 401 }
    )
  }

  const payload = (await request
    .json()
    .catch(() => null)) as StrapiWebhookPayload<StrapiArticleEntry> | null

  if (!payload || !payload.model) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const pathsToRevalidate: string[] = []

  // Always revalidate home pages for all locales
  locales.forEach((locale) => {
    pathsToRevalidate.push(`/${locale}`)
  })

  // Handle Article updates
  // Note: Strapi localized entries usually have a locale field.
  // If the entry has a locale, we might want to be more specific, but for now revalidating for all locales or the specific one is safer.
  if (payload.model === "article") {
    const entry = payload.entry
    // If entry has a specific locale, we could optimize to only revalidate that locale tree.
    // But generic revalidation is acceptable for now.

    locales.forEach((locale) => {
      // 1. Post List
      pathsToRevalidate.push(`/${locale}/posts`)

      // 2. Category/Sort List (if sort exists)
      if (entry.sort) {
        pathsToRevalidate.push(`/${locale}/posts/${entry.sort}`)
      }

      // 3. Post Detail (if sort and documentId exist)
      // Assuming URL structure: /:locale/posts/:sort/:documentId
      if (entry.sort && entry.documentId) {
        pathsToRevalidate.push(
          `/${locale}/posts/${entry.sort}/${entry.documentId}`
        )
      }
    })
  }

  // Deduplicate paths
  const uniquePaths = Array.from(new Set(pathsToRevalidate))

  console.log(`[Webhook] Revalidating paths for ${payload.model}:`, uniquePaths)

  uniquePaths.forEach((path) => {
    revalidatePath(path)
  })

  // Update global content version to notify clients
  contentState.update()

  return NextResponse.json(
    { success: true, revalidated: uniquePaths },
    { status: 200 }
  )
}
