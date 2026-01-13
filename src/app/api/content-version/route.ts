import { contentState } from "@/lib/content-state"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    version: contentState.version
  })
}
