import MaskIcon from "@/components/MaskIcon"
import Image from "next/image"

import InfoWriterAnimation, {
  type Config
} from "@/ui/home/Info-writer-animation"
import Screen from "../../components/Screen"

const PersonScreen = ({ config }: { config: Config }) => {
  return (
    <Screen className="h-[92vh]">
      <div className="relative mx-64 flex h-full">
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <InfoWriterAnimation
            config={config}
            showSocial={true}
          ></InfoWriterAnimation>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="group relative aspect-square w-64 max-w-sm sm:w-72 lg:w-[24rem]">
            <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,214,102,0.12),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(129,140,248,0.14),transparent_45%),radial-gradient(circle_at_15%_80%,rgba(79,70,229,0.12),transparent_45%)] blur-3xl transition duration-700 group-hover:scale-105 group-hover:opacity-90 dark:bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(129,140,248,0.18),transparent_45%),radial-gradient(circle_at_15%_80%,rgba(79,70,229,0.16),transparent_45%)]" />
            <div className="from-white/92 via-slate-50/82 dark:via-[#0c132b]/82 dark:to-[#0f1838]/78 absolute inset-0 rounded-full bg-gradient-to-br to-indigo-50/70 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] transition duration-700 group-hover:translate-y-0.5 group-hover:shadow-[0_30px_90px_-35px_rgba(79,70,229,0.28)] dark:from-[#0b1024]/90" />
            <div className="absolute inset-[2.5%] rounded-full shadow-[0_10px_30px_-24px_rgba(15,23,42,0.5)] transition duration-700 group-hover:scale-[1.007]" />
            <div
              className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full opacity-90 blur-[0.3px] transition duration-1000 group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 90deg, rgba(79,70,229,0.3), rgba(16,185,129,0.55), rgba(99,102,241,0.35), rgba(79,70,229,0.3))",
                mask: "radial-gradient(circle at center, transparent calc(50% - 16px), #000 calc(50% - 12px), transparent calc(50% - 8px))",
                WebkitMask:
                  "radial-gradient(circle at center, transparent calc(50% - 16px), #000 calc(50% - 12px), transparent calc(50% - 8px))"
              }}
            />
            <div className="absolute inset-[6.5%] rounded-full transition duration-700 group-hover:scale-[1.012] group-hover:opacity-85" />
            <div className="absolute inset-[10%] rounded-full transition duration-700 group-hover:scale-[1.018] group-hover:opacity-80" />
            <div className="absolute inset-[13.5%] rounded-full transition duration-700 group-hover:scale-[1.022] group-hover:opacity-70" />
            <div className="relative z-10 h-full w-full rounded-full">
              <div className="absolute inset-0 rounded-full"></div>
              <div className="absolute inset-4 overflow-hidden rounded-full shadow-lg shadow-indigo-500/20 transition duration-700 group-hover:scale-[1.008] group-hover:shadow-indigo-500/30">
                <Image
                  className="object-cover"
                  src={"/images/avg.png"}
                  alt="头像"
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 16rem"
                  priority
                ></Image>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-3 top-8 z-20 h-5 w-5 rounded-full bg-white/85 shadow-lg shadow-indigo-500/20 backdrop-blur dark:bg-white/10">
              <span className="absolute inset-[-3px] animate-breathe-ring rounded-full bg-emerald-400/0 dark:bg-emerald-400/0"></span>
              <span className="absolute inset-[3px] animate-breathe-dot rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(16,185,129,0.12)] dark:shadow-[0_0_0_2px_rgba(16,185,129,0.1)]"></span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <small className="tracking-widest">世间所有路都将与你相逢</small>
            {/* <BounceTransitionView> */}
            <MaskIcon
              src="/svgs/Arrow_down.svg"
              size={24}
              className="h-6 w-6 animate-bounce text-highlight-light dark:text-highlight-dark"
              alt="向下"
            />
            {/* </BounceTransitionView> */}
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default PersonScreen
