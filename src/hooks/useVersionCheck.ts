import { useEffect, useRef, useState } from "react"

interface VersionInfo {
  version: string
  buildTime: string
}

export default function useVersionCheck(checkInterval: number = 60000) {
  // Skip version polling during local development to avoid missing file errors.
  const isProd = typeof window !== "undefined" && process.env.NODE_ENV === "production"

  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false)
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const currentVersionRef = useRef<string | null>(null)

  // 使用不缓存的请求获取版本信息
  const fetchVersionInfo = async (): Promise<VersionInfo> => {
    const timestamp = new Date().getTime()
    const response = await fetch(`/version.json?t=${timestamp}`, {
      cache: "no-cache",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    })

    if (!response.ok) {
      throw new Error(`获取版本信息失败: ${response.status}`)
    }

    return await response.json()
  }

  useEffect(() => {
    if (!isProd) return

    let cancelled = false

    const loadCurrentVersion = async () => {
      try {
        const data = await fetchVersionInfo()
        if (cancelled) return
        console.log("当前版本信息:", data)
        setCurrentVersion(data.version)
        currentVersionRef.current = data.version
      } catch (error) {
        console.error("获取版本信息失败:", error)
      }
    }

    loadCurrentVersion()

    const intervalId = setInterval(async () => {
      if (!currentVersionRef.current) return

      try {
        const data = await fetchVersionInfo()
        console.log("检查到版本信息:", data, "当前版本:", currentVersionRef.current)
        if (data.version !== currentVersionRef.current) {
          console.log("发现新版本:", data.version)
          setNewVersionAvailable(true)
        }
      } catch (error) {
        console.error("检查更新失败:", error)
      }
    }, checkInterval)

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [checkInterval, isProd])

  const refreshApp = (): void => {
    // 强制刷新并清除缓存
    window.location.reload()
  }

  return { newVersionAvailable, refreshApp }
}
