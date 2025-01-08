import Image from "next/image"
import ArrowDown from "~/svgs/Arrow_down.svg"

import InfoWriterAnimation, {
  type Config
} from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"

const PersonScreen = ({ config }: { config: Config }) => {
  return (
    <Screen className="h-[95vh]">
      <div className="relative flex h-full px-6">
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <InfoWriterAnimation
            config={config}
            showSocial={true}
          ></InfoWriterAnimation>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Image
            className="rounded-full"
            src={"/images/avg.png"}
            alt="头像"
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="absolute bottom-0 flex w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <small className="tracking-widest">世间所有路都将与你相逢</small>
            {/* <BounceTransitionView> */}
            <ArrowDown className="h-6 w-6 animate-bounce fill-highlight-light dark:fill-highlight-dark"></ArrowDown>
            {/* </BounceTransitionView> */}
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default PersonScreen
