"use client"
import Screen from "@/components/Screen"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function PersonGrowth() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const { theme } = useTheme()
  const currentTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  const growthArr = [
    {
      date: "2025-02-16",
      event: "引入Giscus评论系统",
      type: "feature",
      icon: "💭",
      milestone: true
    },
    {
      date: "2025-02-15",
      event: "网站整体迁移至wanyue.me",
      type: "deploy",
      icon: "🚀",
      milestone: true
    },
    {
      date: "2025-02-13",
      event: "新域名wanyue.me备案成功",
      type: "domain",
      icon: "📝"
    },
    {
      date: "2025-02-12",
      event: "前后端成功部署到服务器",
      type: "deploy",
      icon: "📦",
      milestone: true
    },
    {
      date: "2025-02-10",
      event: "服务器迁移至47.102.86.191",
      type: "server",
      icon: "🖥️"
    },
    {
      date: "2024-04-19",
      event: "整体接入NestJS接口",
      type: "backend",
      icon: "🔌",
      milestone: true
    },
    {
      date: "2024-04-18",
      event: "博客后台管理发布",
      type: "frontend",
      icon: "⚙️",
      milestone: true
    },
    {
      date: "2024-04-10",
      event: "博客前端初版发布",
      type: "frontend",
      icon: "🎨",
      milestone: true
    },
    {
      date: "2024-03-19",
      event: "使用域名部署Vercel",
      type: "deploy",
      icon: "🚀"
    },
    {
      date: "2024-03-18",
      event: "域名备案通过",
      type: "domain",
      icon: "📝"
    },
    {
      date: "2024-03-13",
      event: "NestJS博客框架搭建",
      type: "backend",
      icon: "🏗️",
      milestone: true
    },
    {
      date: "2024-03-08",
      event: "全面升级为HTTPS",
      type: "security",
      icon: "🔒"
    },
    {
      date: "2024-03-07",
      event: "域名izeper.icu注册",
      type: "domain",
      icon: "🌐"
    },
    {
      date: "2024-02-20",
      event: "云服务器开通",
      type: "server",
      icon: "☁️",
      milestone: true
    }
  ]

  // 提取所有独特的类型
  const types = Array.from(new Set(growthArr.map((item) => item.type)))

  // 根据类型筛选数据
  const filteredGrowthArr = selectedType
    ? growthArr.filter((item) => item.type === selectedType)
    : growthArr

  return (
    <Screen className="mt-24 w-4/5 md:w-3/5">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-highlight-light to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-highlight-dark dark:to-blue-400"
        >
          站点历程
        </motion.div>

        {/* 添加类型筛选器 */}
        <div className="flex flex-wrap justify-center gap-2 px-4">
          <button
            onClick={() => setSelectedType(null)}
            className={`rounded-full px-3 py-1 text-sm transition-all ${
              !selectedType
                ? currentTheme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : currentTheme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            全部
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-full px-3 py-1 text-sm transition-all ${
                selectedType === type
                  ? currentTheme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : currentTheme === "dark"
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>

        <span className="h-1 w-20 rounded-full bg-gradient-to-r from-highlight-light to-blue-500 dark:from-highlight-dark dark:to-blue-400"></span>

        {/* 时间轴内容区域 */}
        <div className="relative w-full">
          <span className="absolute left-1/2 -translate-x-1/2 animate-pulse text-sm text-default-400">
            「 左右滑动查看 」
          </span>
          <div className="flex w-full overflow-x-auto scroll-smooth px-4 pt-8 scrollbar-hide">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="border-gradient-to-b m-8 ml-0 flex w-72 shrink-0 items-center border-l-4 from-highlight-light to-blue-500 pl-6 text-xl font-bold transition-all duration-300 hover:scale-105 dark:from-highlight-dark dark:to-blue-400"
            >
              💪 GROWING...
            </motion.span>

            {filteredGrowthArr.map((growth, index) => (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-gradient-to-b group m-8 flex w-72 shrink-0 flex-col gap-4 border-l-4 from-highlight-light to-blue-500 pl-6 transition-all duration-300 hover:scale-105 hover:pl-8 dark:from-highlight-dark dark:to-blue-400"
                key={index}
              >
                <span className="text-xl font-bold text-default-800">
                  {growth.date}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {growth.icon}
                  </span>
                  <span className="text-sm text-default-500 transition-colors duration-300 group-hover:text-default-800">
                    {growth.event}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

// 类型标签映射函数
function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    feature: "新功能",
    deploy: "部署",
    domain: "域名",
    server: "服务器",
    backend: "后端",
    frontend: "前端",
    security: "安全"
  }
  return typeMap[type] || type
}
