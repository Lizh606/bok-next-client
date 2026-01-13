"use client"

import { addToast, Button, cn } from "@heroui/react"
import { useEffect } from "react"
import useVersionCheck from "../hooks/useVersionCheck"

const UpdateNotification = () => {
  const timeout = 30000

  const { updateType, refreshApp } = useVersionCheck(timeout) // 每30秒检查一次
  useEffect(() => {
    if (updateType) {
      console.log("获取到更新:", updateType)

      const isAppUpdate = updateType === "APP"

      addToast({
        title: isAppUpdate ? "🚀 新版本已就绪" : "🔔 内容已更新",
        description: isAppUpdate
          ? "我们为您准备了新功能和优化，立即刷新体验最新版本！"
          : "刚刚发布了新的文章或动态，点击刷新查看最新内容。",
        color: isAppUpdate ? "success" : "primary", // App update green, Content update blue
        timeout,
        variant: "bordered",
        classNames: {
          base: cn(["flex flex-col items-start"]),
          icon: "w-6 h-6 fill-current",
          title: cn(
            "font-medium",
            isAppUpdate
              ? "text-green-700 dark:text-green-400"
              : "text-blue-700 dark:text-blue-400"
          ),
          description: "text-sm text-default-700 mt-1"
        },
        endContent: (
          <div className="my-2 ms-10 flex justify-end gap-x-3">
            {isAppUpdate && (
              <Button
                color={"default"}
                size="sm"
                variant="bordered"
                onPress={() =>
                  window.open(
                    "https://github.com/Lizh606/bok-next-client/releases",
                    "_blank"
                  )
                }
              >
                查看版本公告
              </Button>
            )}
            <Button
              color={isAppUpdate ? "success" : "primary"}
              size="sm"
              variant="flat"
              onPress={refreshApp}
            >
              🚀 立即刷新
            </Button>
          </div>
        )
      })
    }
  }, [updateType, refreshApp])

  return null
}

export default UpdateNotification
