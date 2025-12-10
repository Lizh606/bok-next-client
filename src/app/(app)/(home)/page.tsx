import Loading from "@/app/(app)/loading"
import type { Config } from "@/ui/home/Info-writer-animation"
import GiscusPanel from "@/ui/post/giscus-panel-client"
import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"

// 动态导入组件
const PersonGrowth = dynamicImport(() => import("@/ui/home/person-growth"), {
  loading: () => <Loading></Loading>
})
const PersonScreen = dynamicImport(() => import("@/ui/home/person-screen"))
const PostScreen = dynamicImport(() => import("@/ui/home/post-screen"))

export default function Home() {
  const { BOK_AUTHOR } = process.env
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: `👋 HI, I'M ${BOK_AUTHOR}`,
          class:
            "inline-flex items-center gap-1.5 self-start rounded-full border border-slate-200 bg-white/90 px-6 py-1 text-[15px] font-semibold uppercase tracking-[0.12em] text-slate-800 shadow-sm shadow-slate-200/70 dark:border-white/50 dark:bg-white/15 dark:text-white dark:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.85)] mb-7 md:mb-9"
        },
        {
          type: "br"
        },

        {
          type: "h1",
          text: "A Fighting Web",
          class:
            "block text-5xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white dark:drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)]"
        },
        {
          type: "code",
          text: "<Developer />",
          class:
            "block italic text-5xl font-semibold leading-tight text-slate-600 md:text-6xl lg:text-7xl dark:text-white dark:drop-shadow-[0_8px_28px_rgba(0,0,0,0.6)]"
        },
        {
          type: "br"
        },
        {
          type: "span",
          text: "Going to A NodeJS Full Stack Developer",
          class:
            "text-xl font-medium text-slate-500 md:text-2xl dark:text-white/90 dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
        },
        {
          type: "br"
        }
      ]
    }
  } as Config

  return (
    <>
      <PersonScreen config={config}></PersonScreen>
      <PostScreen></PostScreen>
      <div className="flex w-full items-center justify-center rounded-xl">
        <PersonGrowth></PersonGrowth>
      </div>
      <div className="mx-auto mt-16 max-w-5xl">
        <GiscusPanel title="博客首页" />
      </div>
    </>
  )
}
