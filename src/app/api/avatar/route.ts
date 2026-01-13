import { NextResponse } from "next/server"

import { getMediaFile, resolveAvatarMediaId } from "@/lib/media"

const buildResponseBody = (
  media: NonNullable<Awaited<ReturnType<typeof getMediaFile>>>
) => ({
  id: media.id,
  url: media.url,
  name: media.name,
  alt: media.alt,
  width: media.width,
  height: media.height
})

export async function GET() {
  try {
    const media = await getMediaFile(resolveAvatarMediaId())
    if (!media) {
      return NextResponse.json(
        { error: "Avatar media not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      )
    }
    return NextResponse.json(buildResponseBody(media), {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" }
    })
  } catch (error) {
    console.error("Failed to fetch avatar media", error)
    return NextResponse.json(
      { error: "Failed to fetch avatar media" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    )
  }
}
