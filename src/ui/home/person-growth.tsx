import Screen from "@/components/Screen"

export default function PersonGrowth() {
  const growthArr = [
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

  return (
    <Screen className="mt-24 w-3/5">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-2xl font-bold">站点历程</div>
        <span className="h-[2px] w-12 rounded-full bg-highlight-light dark:bg-highlight-dark"></span>
        <span className="text-sm text-default-400">「 左右滑动查看 」</span>
        <div className="flex w-full overflow-x-scroll">
          <span className="m-8 ml-0 flex w-60 shrink-0 items-center border-l-4 border-highlight-light pl-4 text-xl font-bold dark:border-highlight-dark">
            💪 GROWING...
          </span>
          {growthArr.map((growth, index) => {
            return (
              <div
                className="m-8 flex w-60 shrink-0 flex-col gap-4 border-l-4 border-highlight-light pl-4 dark:border-highlight-dark"
                key={index}
              >
                <span className="text-xl font-bold">{growth.date}</span>
                <div className="flex items-center gap-2">
                  <span>{growth.icon}</span>
                  <span className="text-sm text-default-400">
                    {growth.event}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}
