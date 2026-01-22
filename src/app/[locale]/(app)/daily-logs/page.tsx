import { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { DailyLog, DailyLogList } from "@/ui/daily-logs/daily-log-list"

export default async function DailyLogsPage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  // 模拟数据
  const logs: DailyLog[] = [
    {
      id: 1,
      title: "冬日的午后咖啡",
      date: "2024-01-19",
      image: "/images/bg1.png",
      description:
        "阳光洒在书桌上，一杯热咖啡，一段宁静的时光。在代码的间隙寻找呼吸感，这就是生活的节奏。"
    },
    {
      id: 2,
      title: "光影的魔力",
      date: "2024-01-18",
      image: "/images/bg1.png",
      description:
        "夕阳穿透窗帘，给房间镀上了一层金边。那一刻，我觉得所有的忙碌都值得了。"
    },
    {
      id: 3,
      title: "深夜的代码马拉松",
      date: "2024-01-17",
      image: "/images/bg1.png",
      description:
        "键盘的敲击声是唯一的旋律。在深夜里推敲逻辑，有一种纯粹的成就感。"
    }
  ]

  return (
    <div className="container mx-auto min-h-screen animate-slide-up px-4 py-24">
      <header className="mx-auto mb-32 max-w-4xl text-center">
        <span className="text-highlight/60 mb-8 block text-tiny font-black uppercase tracking-[0.5em]">
          Daily Narratives
        </span>
        <h1 className="mb-8 text-6xl font-black tracking-tighter text-foreground dark:text-white md:text-8xl">
          {dict.daily_logs.title}
        </h1>
        <div className="via-highlight mx-auto mb-8 h-1 w-24 bg-gradient-to-r from-transparent to-transparent opacity-50" />
        <p className="mx-auto max-w-2xl text-2xl font-medium leading-relaxed text-default-500">
          {dict.daily_logs.subtitle}
        </p>
      </header>

      <DailyLogList logs={logs} dict={dict as any} locale={locale} />
    </div>
  )
}
