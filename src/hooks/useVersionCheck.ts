import { useEffect, useState } from "react"

interface VersionInfo {
  version: string
  buildTime: string
}

export default function useVersionCheck(checkInterval: number = 60000) {
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false)
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)

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
    // 首次加载时获取当前版本
    fetchVersionInfo()
      .then((data: VersionInfo) => {
        console.log("当前版本信息:", data)
        setCurrentVersion(data.version)
      })
      .catch((error) => console.error("获取版本信息失败:", error))

    // 设置定期检查
    const intervalId = setInterval(() => {
      if (!currentVersion) return

      fetchVersionInfo()
        .then((data: VersionInfo) => {
          console.log("检查到版本信息:", data, "当前版本:", currentVersion)
          if (data.version !== currentVersion) {
            console.log("发现新版本:", data.version)
            setNewVersionAvailable(true)
          }
        })
        .catch((error) => console.error("检查更新失败:", error))
    }, checkInterval)

    return () => clearInterval(intervalId)
  }, [currentVersion, checkInterval])

  const refreshApp = (): void => {
    // 强制刷新并清除缓存
    window.location.reload()
  }

  return { newVersionAvailable, refreshApp }
}
