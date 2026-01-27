"use client"
import { useEffect, useMemo, useState, type ReactNode } from "react"

interface Quote {
  text: string
  singer: string
}

interface TimePanelProps {
  dayOfYearLabel: string
  yearProgressLabel: string
  todayProgressLabel: string
  nowPlayingLabel: string
  quotes: Quote[]
}

const quotes: Quote[] = [
  {
    text: "原来时间最远 不是距离而是昨天",
    singer: "-- G.E.M.邓紫棋"
  },
  {
    text: "天空没有极限 你的未来无边",
    singer: "-- G.E.M.邓紫棋"
  },
  {
    text: "生命够曲折才够真实 人痛过才够坚持",
    singer: "-- G.E.M.邓紫棋"
  },
  {
    text: "成长要学会独处 虽然有一点孤独",
    singer: "-- G.E.M.邓紫棋"
  }
]
const singerText = "-- G.E.M.邓紫棋"

const renderTemplate = (
  template: string,
  values: Record<string, ReactNode>
) => {
  const parts = template.split(/(\{[^}]+\})/)
  return parts.map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return <span key={index}>{values[part] || part}</span>
    }
    return part
  })
}

export default function TimePanel({
  dayOfYearLabel,
  yearProgressLabel,
  todayProgressLabel,
  nowPlayingLabel
}: Omit<TimePanelProps, "quotes">) {
  // 获取当前年份
  const currentYear: number = new Date().getFullYear()

  // 获取今天是今年的第几天
  const today: Date = new Date()
  const startOfYear: Date = new Date(today.getFullYear(), 0, 0)
  const diff: number = today.getTime() - startOfYear.getTime()
  const oneDay: number = 1000 * 60 * 60 * 24
  const dayOfYear: number = Math.floor(diff / oneDay)

  const safeQuotes = useMemo(() => quotes, [])
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  // 使用 useMemo 初始化百分比，避免运行时 Effect 触发同步渲染
  const initialPercentages = useMemo(() => {
    const today: Date = new Date()
    const startOfYear: Date = new Date(today.getFullYear(), 0, 0)

    const getTodayPct = (): number => {
      const secondsInADay = 24 * 60 * 60 * 1000
      const msPassed =
        today.getHours() * 3600 * 1000 +
        today.getMinutes() * 60 * 1000 +
        today.getSeconds() * 1000 +
        today.getMilliseconds()
      return (msPassed / secondsInADay) * 100
    }

    const getYearPct = (): number => {
      const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59)
      return (
        ((today.getTime() - startOfYear.getTime()) /
          (endOfYear.getTime() - startOfYear.getTime())) *
        100
      )
    }

    return { today: getTodayPct(), year: getYearPct() }
  }, [])

  const [PassDayPercent, setPassDayPercent] = useState(initialPercentages.year)
  const [remainingPercentage, setRemainingPercentage] = useState(
    initialPercentages.today
  )

  useEffect(() => {
    const updateToday = () => {
      const now = new Date()
      const msPassed =
        now.getHours() * 3600 * 1000 +
        now.getMinutes() * 60 * 1000 +
        now.getSeconds() * 1000 +
        now.getMilliseconds()
      setRemainingPercentage((msPassed / (24 * 60 * 60 * 1000)) * 100)
    }

    const updateYear = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59)
      setPassDayPercent(
        ((now.getTime() - start.getTime()) /
          (end.getTime() - start.getTime())) *
          100
      )
    }

    const intervalToday = setInterval(updateToday, 1)
    const intervalYear = setInterval(updateYear, 1000)

    return () => {
      clearInterval(intervalToday)
      clearInterval(intervalYear)
    }
  }, [])

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => {
        const nextIndex =
          prevIndex === safeQuotes.length - 1 ? 0 : prevIndex + 1
        setQuoteDisplay({ lyric: "", singer: "", target: "lyric" })
        return nextIndex
      })
    }, 4000)

    return () => clearInterval(quoteInterval)
  }, [safeQuotes.length])

  const [quoteDisplay, setQuoteDisplay] = useState({
    lyric: "",
    singer: "",
    target: "lyric" as "lyric" | "singer" | "none"
  })

  useEffect(() => {
    const currentQuote = safeQuotes[currentQuoteIndex] ?? quotes[0]
    const lyricChars = currentQuote.text.split("")
    const singerChars = currentQuote.singer.split("")
    const timers: ReturnType<typeof setTimeout>[] = []
    const lyricInterval = 70
    const singerInterval = 60
    const gapAfterLyric = 220
    const gapAfterSinger = 600

    lyricChars.forEach((_, index) => {
      timers.push(
        setTimeout(
          () => {
            setQuoteDisplay((prev) => ({
              ...prev,
              lyric: lyricChars.slice(0, index + 1).join("")
            }))
          },
          lyricInterval * (index + 1)
        )
      )
    })

    const lyricDuration = lyricChars.length * lyricInterval
    timers.push(
      setTimeout(() => {
        setQuoteDisplay((prev) => ({ ...prev, target: "singer" }))
        singerChars.forEach((_, index) => {
          timers.push(
            setTimeout(
              () => {
                setQuoteDisplay((prev) => ({
                  ...prev,
                  singer: singerChars.slice(0, index + 1).join("")
                }))
              },
              singerInterval * (index + 1)
            )
          )
        })
      }, lyricDuration + gapAfterLyric)
    )

    const singerDuration = singerChars.length * singerInterval
    timers.push(
      setTimeout(
        () => {
          setQuoteDisplay((prev) => ({ ...prev, target: "none" }))
        },
        lyricDuration + gapAfterLyric + singerDuration + gapAfterSinger
      )
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [currentQuoteIndex, safeQuotes])

  return (
    <div className="flex flex-col gap-2">
      <p>
        {renderTemplate(dayOfYearLabel, {
          "{year}": <b className="text-highlight">{currentYear}</b>,
          "{day}": <b className="text-highlight">{dayOfYear}</b>
        })}
      </p>
      <p>
        {renderTemplate(yearProgressLabel, {
          "{percent}": (
            <b className="text-highlight">{PassDayPercent.toFixed(6)}</b>
          )
        })}
      </p>
      <p>
        {renderTemplate(todayProgressLabel, {
          "{percent}": (
            <span className="text-highlight transition-all duration-[1] ease-linear">
              {remainingPercentage.toFixed(6)}
            </span>
          )
        })}
      </p>
      <div className="mt-8 flex w-full max-w-xl justify-center">
        <div className="relative w-full overflow-hidden rounded-[30px] border px-6 py-8 text-left shadow-[0_6px_20px_rgba(15,23,42,0.1)] dark:border-white/10 dark:text-white dark:shadow-[0_30px_90px_rgba(15,23,42,0.65)] md:px-8">
          <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-[#61B9AF]/20 bg-gradient-to-br from-[#61B9AF]/70 via-white/90 to-white dark:bg-gradient-to-br dark:from-indigo-500/80 dark:via-fuchsia-500/70 dark:to-rose-500/70" />
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(97,185,175,0.3),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-10 -top-6 h-32 w-32 rounded-full bg-[#61B9AF]/30 blur-3xl dark:bg-white/30"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-[#61B9AF]/30 blur-3xl dark:bg-purple-300/50"
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-slate-700 dark:text-white/60">
              {nowPlayingLabel}
            </p>
            <div className="min-h-[4.5rem] space-y-3 text-slate-800 drop-shadow-[0_0_20px_rgba(97,185,175,0.8)] dark:text-white">
              <span
                className={`typed-line block text-2xl font-light italic leading-relaxed tracking-[0.2em] text-slate-800 dark:text-white ${
                  quoteDisplay.target === "lyric"
                    ? "typed-line--active"
                    : "typed-line--done"
                }`}
              >
                {quoteDisplay.lyric || "\u00A0"}
              </span>
              <div className="flex justify-end">
                <span
                  className={`typed-line typed-line--singer block w-[42%] min-w-[42%] text-right text-xs font-semibold uppercase tracking-[0.3em] text-slate-800/70 dark:text-white/70 ${
                    quoteDisplay.target === "singer"
                      ? "typed-line--active"
                      : "typed-line--done"
                  }`}
                >
                  {quoteDisplay.singer || "\u00A0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
