import type { Config } from "@/ui/home/Info-writer-animation"
import PersonGrowth from "@/ui/home/person-growth"
import PersonScreen from "@/ui/home/person-screen"
import PostScreen from "@/ui/home/post-screen"

const GrowthScreen = () => {
  return <div className="h-screen flex relative">container:站点成长</div>
}

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
      <div className="rounded-xl flex items-center justify-center w-full">
        <PersonGrowth></PersonGrowth>
      </div>
      {/* <GrowthScreen></GrowthScreen> */}
    </>
  )
}
