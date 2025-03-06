import { useEffect, useState } from "react"

interface VersionInfo {
  version: string
  buildTime: string
}

export default function useVersionCheck(checkInterval: number = 60000) {
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false)
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)

  useEffect(() => {
    // 首次加载时获取当前版本
    fetch("/version.json?t=" + new Date().getTime())
      .then((response) => response.json())
      .then((data: VersionInfo) => {
        setCurrentVersion(data.version)
      })
      .catch((error) => console.error("获取版本信息失败:", error))

    // 设置定期检查
    const intervalId = setInterval(() => {
      if (!currentVersion) return

      fetch("/version.json?t=" + new Date().getTime(), { cache: "no-store" })
        .then((response) => response.json())
        .then((data: VersionInfo) => {
          if (data.version !== currentVersion) {
            setNewVersionAvailable(true)
          }
        })
        .catch((error) => console.error("检查更新失败:", error))
    }, checkInterval)

    return () => clearInterval(intervalId)
  }, [currentVersion, checkInterval])

  const refreshApp = (): void => {
    window.location.reload()
  }

  return { newVersionAvailable, refreshApp }
}
