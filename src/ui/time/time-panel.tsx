"use client"
import { useEffect, useState } from "react"

const quotes = [
  "原来时间最远 不是距离而是昨天",
  "天空没有极限 你的未来无边",
  "生命够曲折才够真实 人痛过才够坚持",
  "成长要学会独处 虽然有一点孤独"
]
const singerText = "-- G.E.M.邓紫棋"

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

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedLyric, setDisplayedLyric] = useState("")
  const [displayedSinger, setDisplayedSinger] = useState("")
  const [cursorTarget, setCursorTarget] = useState<
    "lyric" | "singer" | "none"
  >("lyric")

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

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const lyricChars = quotes[currentQuoteIndex].split("")
    const singerChars = singerText.split("")
    const timers: ReturnType<typeof setTimeout>[] = []
    const lyricInterval = 70
    const singerInterval = 60
    const gapAfterLyric = 220
    const gapAfterSinger = 600

    setDisplayedLyric("")
    setDisplayedSinger("")
    setCursorTarget("lyric")

    lyricChars.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setDisplayedLyric(lyricChars.slice(0, index + 1).join(""))
        }, lyricInterval * (index + 1))
      )
    })

    const lyricDuration = lyricChars.length * lyricInterval
    timers.push(
      setTimeout(() => {
        setCursorTarget("singer")
        singerChars.forEach((_, index) => {
          timers.push(
            setTimeout(() => {
              setDisplayedSinger(singerChars.slice(0, index + 1).join(""))
            }, singerInterval * (index + 1))
          )
        })
      }, lyricDuration + gapAfterLyric)
    )

    const singerDuration = singerChars.length * singerInterval
    timers.push(
      setTimeout(() => {
        setCursorTarget("none")
      }, lyricDuration + gapAfterLyric + singerDuration + gapAfterSinger)
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [currentQuoteIndex])

  return (
    <div className="flex flex-col gap-2">
      <p>
        今天是 <b className="text-highlight">{currentYear}</b> 年的第{" "}
        <b className="text-highlight">{dayOfYear}</b> 天
      </p>
      <p>
        今年已过 <b className="text-highlight">{PassDayPercent.toFixed(6)}</b> %
      </p>
      <p>
        今天已过{" "}
        <span className="text-highlight transition-all duration-[1] ease-linear">
          {remainingPercentage.toFixed(6)}
        </span>{" "}
        %
      </p>
      <div className="mt-8 flex w-full max-w-xl justify-center">
        <div className="relative w-full overflow-hidden rounded-[30px] border px-6 py-8 text-left shadow-[0_6px_20px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_90px_rgba(15,23,42,0.65)] dark:border-white/10 dark:text-white md:px-8">
          <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-[#61B9AF]/20 bg-gradient-to-br from-[#61B9AF]/70 via-white/90 to-white dark:bg-gradient-to-br dark:from-indigo-500/80 dark:via-fuchsia-500/70 dark:to-rose-500/70" />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(97,185,175,0.3),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" aria-hidden="true" />
          <span className="pointer-events-none absolute -top-6 -right-10 h-32 w-32 rounded-full bg-[#61B9AF]/30 blur-3xl dark:bg-white/30" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-[#61B9AF]/30 blur-3xl dark:bg-purple-300/50" aria-hidden="true" />
          <div className="relative z-10 space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-slate-700 dark:text-white/60">
              now playing
            </p>
            <div className="space-y-3 text-slate-800 drop-shadow-[0_0_20px_rgba(97,185,175,0.8)] dark:text-white min-h-[4.5rem]">
              <span
                className={`typed-line block text-2xl font-light italic leading-relaxed tracking-[0.2em] text-slate-800 dark:text-white ${
                  cursorTarget === "lyric" ? "typed-line--active" : "typed-line--done"
                }`}
              >
                {displayedLyric || "\u00A0"}
              </span>
              <div className="flex justify-end">
                <span
                  className={`typed-line typed-line--singer block w-[42%] min-w-[42%] text-right text-xs font-semibold uppercase tracking-[0.3em] text-slate-800/70 dark:text-white/70 ${
                    cursorTarget === "singer"
                      ? "typed-line--active"
                      : "typed-line--done"
                  }`}
                >
                  {displayedSinger || "\u00A0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
