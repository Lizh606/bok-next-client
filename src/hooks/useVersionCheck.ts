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

  // Fetch Content Version (Strapi Updates 适配 NestJS)
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
      if (currentContentVersionRef.current) {
        const contentData = await fetchContentVersion()
        if (
          contentData &&
          contentData.version > currentContentVersionRef.current
        ) {
          console.log("New Content Detected:", contentData.version)
          setUpdateType((prev) => (prev === "APP" ? "APP" : "CONTENT"))
        }
      }
    }, checkInterval)

    return () => clearInterval(intervalId)
  }, [checkInterval])

  const refreshApp = async (): Promise<void> => {
    window.location.reload()
  }

  return { updateType, refreshApp }
}
