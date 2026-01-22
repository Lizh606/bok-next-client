import { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { LogArticle } from "@/ui/daily-logs/log-article"

export default async function DailyLogDetailPage({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = await params
  const dict = await getDictionary(locale)

  // 模拟数据获取逻辑
  const log = {
    id: Number(id),
    title:
      id === "1"
        ? "冬日的午后咖啡"
        : id === "2"
          ? "光影的魔力"
          : "深夜的代码马拉松",
    date: id === "1" ? "2024-01-19" : id === "2" ? "2024-01-18" : "2024-01-17",
    image: "/images/bg1.png",
    description:
      id === "1"
        ? "阳光洒在书桌上，一杯热咖啡，一段宁静的时光。在代码的间隙寻找呼吸感，这就是生活的节奏。"
        : "夕阳穿透窗帘，给房间镀上了一层金边。那一刻，我觉得所有的忙碌都值得了。"
  }

  return (
    <div className="min-h-screen">
      <LogArticle log={log as any} dict={dict} locale={locale} />
    </div>
  )
}
