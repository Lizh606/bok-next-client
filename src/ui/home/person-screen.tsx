"use client"
import BounceTransitionView from "@/components/BounceTransitionView"
import Image from "next/image"
import ArrowDown from "~/svgs/Arrow_down.svg"

import TypewriterAnimation, {
  type Config
} from "@/components/TypewriterAnimation"
import Screen from "./screen"

const PersonScreen = () => {
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
          text: "XiaoHang",
          class: "font-bold mx-2 text-4xl"
        },
        {
          type: "h1",
          text: "👻",
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
        }
      ]
    }
  } as Config
  return (
    <Screen className="h-[95vh]">
      <div className="h-full flex relative px-6">
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <TypewriterAnimation config={config}></TypewriterAnimation>
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <Image
            className="rounded-full"
            src={"/images/avg.png"}
            alt="头像"
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="absolute bottom-0 w-full flex justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            <small>世间所有路都将与你相逢</small>
            <BounceTransitionView>
              <ArrowDown className="w-6 h-6"></ArrowDown>
            </BounceTransitionView>
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default PersonScreen
