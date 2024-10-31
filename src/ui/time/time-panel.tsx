"use client"
import { useEffect, useState } from "react"

export default function TimePanel() {
  // 获取当前年份
  const currentYear: number = new Date().getFullYear()

  // 获取今天是今年的第几天
  const today: Date = new Date()
  const startOfYear: Date = new Date(today.getFullYear(), 0, 0)
  const diff: number = today.getTime() - startOfYear.getTime()
  const oneDay: number = 1000 * 60 * 60 * 24
  const dayOfYear: number = Math.floor(diff / oneDay)

  // 获取今年已过百分多少
  const [PassDayPercent, setPassDayPercent] = useState(0)

  // 获取今天已过百分比
  const [remainingPercentage, setRemainingPercentage] = useState(0)

  useEffect(() => {
    const today: Date = new Date()
    const startOfYear: Date = new Date(today.getFullYear(), 0, 0)

    // 初始化今天已过百分比
    const getTodayRemainingPercentage = (): number => {
      const now = new Date()

      const secondsInADay = 24 * 60 * 60 * 1000 // 用毫秒表示全天的时间
      const millisecondsPassedToday =
        now.getHours() * 3600 * 1000 +
        now.getMinutes() * 60 * 1000 +
        now.getSeconds() * 1000 +
        now.getMilliseconds()

      return (millisecondsPassedToday / secondsInADay) * 100
    }
    setRemainingPercentage(getTodayRemainingPercentage())

    // 更新今天已过百分比
    const intervalId = setInterval(() => {
      setRemainingPercentage(getTodayRemainingPercentage())
    }, 1)

    // 初始化今年已过百分比
    const getPassDayPercent = (): number => {
      const endOfYear: Date = new Date(today.getFullYear(), 11, 31, 23, 59, 59)
      const totalMilliseconds: number =
        endOfYear.getTime() - startOfYear.getTime()
      const elapsedMilliseconds: number =
        today.getTime() - startOfYear.getTime()
      const PassDayPercent = (elapsedMilliseconds / totalMilliseconds) * 100
      return PassDayPercent
    }
    setPassDayPercent(getPassDayPercent())

    // 更新今年已过百分比
    const intervalId1 = setInterval(() => {
      setPassDayPercent(getPassDayPercent())
    }, 1000)

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId)
      clearInterval(intervalId1)
    }
  }, [])
  return (
    <div className="flex flex-col gap-2">
      <p>
        今天是 <b>{currentYear}</b> 年的第 <b>{dayOfYear}</b> 天
      </p>
      <p>今年已过 {PassDayPercent.toFixed(6)}%</p>
      <p>
        今天已过{" "}
        <span className="transition-all duration-[1] ease-linear">
          {remainingPercentage.toFixed(6)}
        </span>
        %
      </p>
      <p>天空没有极限 我们的未来无边</p>
    </div>
  )
}
