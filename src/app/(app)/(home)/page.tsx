import Loading from "@/app/(app)/loading"
import type { Config } from "@/ui/home/Info-writer-animation"
import dynamic from "next/dynamic"

// 动态导入组件
const PersonGrowth = dynamic(() => import("@/ui/home/person-growth"), {
  loading: () => <Loading></Loading>
})
const PersonScreen = dynamic(() => import("@/ui/home/person-screen"))
const PostScreen = dynamic(() => import("@/ui/home/post-screen"))
const GiscusPanel = dynamic(() => import("@/ui/post/giscus-panel"), {
  ssr: false // Giscus评论组件在客户端渲染
})

export default function Home() {
  const { BOK_AUTHOR } = process.env
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: "Hi, I'm ",
          class: "text-4xl"
        },
        {
          type: "h1",
          text: `${BOK_AUTHOR}`,
          class: "font-bold mx-2 text-4xl"
        },
        {
          type: "h1",
          text: "🫡",
          class: "font-light text-4xl"
        },
        {
          type: "br"
        },
        {
          type: "h1",
          text: "A Fighting Web",
          class: "font-light text-4xl"
        },
        {
          type: "code",
          text: "<Developer />",
          class:
            "font-medium mx-2 text-3xl rounded p-1 bg-gray-200 dark:bg-gray-800/0 hover:dark:bg-gray-800/100 bg-opacity-0 hover:bg-opacity-100 transition-background duration-200"
        },
        {
          type: "span",
          class:
            "inline-block w-[1px] h-8 -bottom-2 relative bg-gray-800/80 dark:bg-gray-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animation-blink"
        },
        {
          type: "br"
        },
        {
          type: "span",
          text: "Going to A NodeJS Full Stack Developer",
          class: "font-light"
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
