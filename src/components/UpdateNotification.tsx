"use client"

import { addToast, Button, cn } from "@heroui/react"
import { useEffect } from "react"
import useVersionCheck from "../hooks/useVersionCheck"

const UpdateNotification = () => {
  const timeout = 30000

  const { newVersionAvailable, refreshApp } = useVersionCheck(timeout) // 每30秒检查一次
  useEffect(() => {
    if (newVersionAvailable) {
      console.log("获取到新版本")
      addToast({
        title: "🚀 新版本已就绪",
        description: "我们为您准备了新功能和优化，立即刷新体验最新版本！",
        color: "success",
        timeout,
        variant: "bordered",
        classNames: {
          base: cn(["flex flex-col items-start"]),
          icon: "w-6 h-6 fill-current",
          title: "font-medium text-green-700 dark:text-green-400",
          description: "text-sm text-default-700 mt-1"
        },
        endContent: (
          <div className="my-2 ms-10 flex justify-end gap-x-3">
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
            <Button
              color={"success"}
              size="sm"
              variant="flat"
              onPress={refreshApp}
            >
              立即刷新
            </Button>
          </div>
        )
      })
    }
  }, [newVersionAvailable, refreshApp])

  return null
}

export default UpdateNotification
