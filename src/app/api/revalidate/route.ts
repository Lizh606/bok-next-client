import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

type RevalidateBody = {
  secret?: string
  path?: string
  paths?: string[]
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as RevalidateBody | null
  const secret = process.env.REVALIDATE_SECRET

  if (!secret || !body || body.secret !== secret) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter((item) => typeof item === "string" && item.length > 0)
    : typeof body.path === "string" && body.path.length > 0
      ? [body.path]
      : []

  if (paths.length === 0) {
    return NextResponse.json(
      { message: "Missing path" },
      { status: 400 }
    )
  }

  paths.forEach((path) => revalidatePath(path))

  return NextResponse.json({ revalidated: true, paths })
}
