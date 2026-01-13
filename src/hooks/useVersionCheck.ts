"use client"

import { useEffect, useRef, useState } from "react"

interface VersionInfo {
  version: string
  buildTime: string
}

interface ContentVersionInfo {
  version: number
}

export type UpdateType = "APP" | "CONTENT" | null

export default function useVersionCheck(checkInterval: number = 60000) {
  // Relaxed: Always check in dev mode too if user wants to test it, or keep isProd check for app version but separate for content?
  // User wants to test locally, so we remove the strict isProd check or allow it to be bypassed.
  // We'll check process.env.NODE_ENV, but for the purpose of this request (testing local webhook), we should allow it running.
  // However, usually we don't want polling in dev. Let's keep it simple: run if window exists.
  // If the user finds it annoying in dev, they can disable it later.

  const [updateType, setUpdateType] = useState<UpdateType>(null)

  const currentAppVersionRef = useRef<string | null>(null)
  const currentContentVersionRef = useRef<number | null>(null)

  // Fetch App Version (Deployment)
  const fetchAppVersion = async (): Promise<VersionInfo | null> => {
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/version.json?t=${timestamp}`, {
        cache: "no-cache",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" }
      })
      if (!response.ok) return null
      return await response.json()
    } catch (e) {
      console.error("Failed to fetch app version", e)
      return null
    }
  }

  // Fetch Content Version (Strapi Updates)
  const fetchContentVersion = async (): Promise<ContentVersionInfo | null> => {
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/content-version?t=${timestamp}`, {
        cache: "no-cache",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" }
      })
      if (!response.ok) return null
      return await response.json()
    } catch (e) {
      console.error("Failed to fetch content version", e)
      return null
    }
  }

  useEffect(() => {
    // Initial Load
    const init = async () => {
      const appData = await fetchAppVersion()
      if (appData) currentAppVersionRef.current = appData.version

      const contentData = await fetchContentVersion()
      if (contentData) currentContentVersionRef.current = contentData.version

      console.log("Initial Versions:", {
        app: appData?.version,
        content: contentData?.version
      })
    }

    init()

    // Polling
    const intervalId = setInterval(async () => {
      // 1. Check App Version
      if (currentAppVersionRef.current) {
        const appData = await fetchAppVersion()
        if (appData && appData.version !== currentAppVersionRef.current) {
          console.log("New App Version Detected:", appData.version)
          setUpdateType("APP")
          return // Prioritize app app update
        }
      }

      // 2. Check Content Version
      // We only check this if we have an initial content version to compare against
      if (currentContentVersionRef.current) {
        const contentData = await fetchContentVersion()
        console.log("Content Data:", contentData)
        if (
          contentData &&
          contentData.version > currentContentVersionRef.current
        ) {
          // Only notify if we haven't already notified about an app update (which is bigger)
          // Also avoid re-triggering if we already know about a content update
          // But technically React state setter handles duplicates.
          console.log("New Content Detected:", contentData.version)
          setUpdateType((prev) => (prev === "APP" ? "APP" : "CONTENT"))
        }
      }
    }, checkInterval)

    return () => clearInterval(intervalId)
  }, [checkInterval])

  const refreshApp = async (): Promise<void> => {
    // Force reload to ensure all data and assets are fresh
    window.location.reload()
  }

  return { updateType, refreshApp }
}
