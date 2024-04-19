"use client"
import Image from "next/image"
import ArrowDown from "~/svgs/Arrow_down.svg"

import InfoWriterAnimation, {
  type Config
} from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"

const PersonScreen = ({ config }: { config: Config }) => {
  return (
    <Screen className="h-[95vh]">
      <div className="h-full flex relative px-6">
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <InfoWriterAnimation
            config={config}
            showSocial={true}
          ></InfoWriterAnimation>
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
            <small className="tracking-widest">世间所有路都将与你相逢</small>
            {/* <BounceTransitionView> */}
            <ArrowDown className="animate-bounce w-6 h-6 fill-highlight-light dark:fill-highlight-dark"></ArrowDown>
            {/* </BounceTransitionView> */}
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default PersonScreen
