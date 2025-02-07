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
    <Screen className="mt-24 w-4/5 md:w-3/5">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-gradient-to-r from-highlight-light to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-highlight-dark dark:to-blue-400">
          站点历程
        </div>
        <span className="h-1 w-20 rounded-full bg-gradient-to-r from-highlight-light to-blue-500 dark:from-highlight-dark dark:to-blue-400"></span>
        <span className="animate-pulse text-sm text-default-400">
          「 左右滑动查看 」
        </span>
        <div className="flex w-full overflow-x-auto scroll-smooth px-4 scrollbar-hide">
          <span className="border-gradient-to-b m-8 ml-0 flex w-72 shrink-0 items-center border-l-4 from-highlight-light to-blue-500 pl-6 text-xl font-bold transition-all duration-300 hover:scale-105 dark:from-highlight-dark dark:to-blue-400">
            💪 GROWING...
          </span>
          {growthArr.map((growth, index) => {
            return (
              <div
                className="border-gradient-to-b group m-8 flex w-72 shrink-0 flex-col gap-4 border-l-4 from-highlight-light to-blue-500 pl-6 transition-all duration-300 hover:scale-105 hover:pl-8 dark:from-highlight-dark dark:to-blue-400"
                key={index}
              >
                <span className="text-xl font-bold text-default-800 dark:text-default-200">
                  {growth.date}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {growth.icon}
                  </span>
                  <span className="text-sm text-default-500 transition-colors duration-300 group-hover:text-default-800 dark:text-default-400 dark:group-hover:text-default-200">
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
