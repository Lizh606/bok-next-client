"use client"
import Screen from "@/components/Screen"
import type { SiteGrowthEvent } from "@/lib/site-growth"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAppTheme } from "../../hooks/useAppTheme"

type PersonGrowthProps = {
  title: string
  allLabel: string
  swipeHint: string
  growingLabel: string
  typeLabels: Record<string, string>
  items: SiteGrowthEvent[]
}

export default function PersonGrowth({
  title,
  allLabel,
  swipeHint,
  growingLabel,
  typeLabels,
  items
}: PersonGrowthProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const { currentTheme } = useAppTheme()

  // 提取所有独特的类型
  const types = Array.from(
    new Set(items.map((item) => item.type).filter(Boolean))
  )

  // 根据类型筛选数据
  const filteredGrowthArr = selectedType
    ? items.filter((item) => item.type === selectedType)
    : items

  return (
    <Screen className="mt-24 w-4/5 md:w-3/5">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-highlight-light to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-highlight-dark dark:to-blue-400"
        >
          {title}
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
            {allLabel}
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
              {getTypeLabel(type, typeLabels)}
            </button>
          ))}
        </div>

        <span className="h-1 w-20 rounded-full bg-gradient-to-r from-highlight-light to-blue-500 dark:from-highlight-dark dark:to-blue-400"></span>

        {/* 时间轴内容区域 */}
        <div className="relative w-full">
          <span className="absolute left-1/2 -translate-x-1/2 animate-pulse text-sm text-default-400">
            {swipeHint}
          </span>
          <div className="flex w-full overflow-x-auto scroll-smooth px-4 pt-8 scrollbar-hide">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="border-gradient-to-b m-8 ml-0 flex w-72 shrink-0 items-center border-l-4 from-highlight-light to-blue-500 pl-6 text-xl font-bold transition-all duration-300 hover:scale-105 dark:from-highlight-dark dark:to-blue-400"
            >
              {growingLabel}
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
                    {growth.icon ?? "📌"}
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

function getTypeLabel(
  type: string,
  typeLabels: Record<string, string>
): string {
  return typeLabels[type] || type
}
