import MaskIcon from "@/components/MaskIcon"
import Image from "next/image"

import InfoWriterAnimation, {
  type Config
} from "@/ui/home/Info-writer-animation"
import clsx from "clsx"
import Screen from "../../components/Screen"

type PersonScreenProps = {
  config: Config
  tagline: string
  avatarAlt: string
  avatarSrc?: string
  arrowAlt: string
}

const PersonScreen = ({
  config,
  tagline,
  avatarAlt,
  avatarSrc,
  arrowAlt
}: PersonScreenProps) => {
  return (
    <Screen className="relative flex min-h-[92vh] items-center justify-center py-20 lg:py-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text Content */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <InfoWriterAnimation config={config} showSocial={true} />
          </div>

          {/* Right: Avatar With Nebula Glow */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="group relative aspect-square w-64 max-w-sm sm:w-72 lg:w-[28rem]">
              {/* Optimized Nebula Glow (CSS + SVG) */}
              <div className="absolute inset-[-20%] animate-[spin_20s_linear_infinite] rounded-full opacity-60 blur-3xl transition duration-1000 group-hover:opacity-80">
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(97,185,175,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.3),transparent_60%)]" />
              </div>

              {/* Rotating Ring 1 */}
              <div className="absolute inset-[-10%] animate-[spin_15s_linear_infinite_reverse] rounded-full opacity-40 blur-2xl">
                <div className="h-full w-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(138,43,226,0.3)_180deg,transparent_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0deg,rgba(189,51,164,0.4)_180deg,transparent_360deg)]" />
              </div>

              {/* Avatar Container */}
              <div className="relative z-10 h-full w-full rounded-full p-2">
                <div
                  className={clsx(
                    "relative h-full w-full overflow-hidden rounded-full border-4 shadow-2xl transition-transform duration-700 group-hover:scale-105",
                    "border-white/50 bg-white/20 shadow-highlight-light/20 backdrop-blur-sm",
                    "dark:border-white/10 dark:bg-white/5 dark:shadow-highlight-dark/40"
                  )}
                >
                  <Image
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src={avatarSrc ?? "/images/avg.png"}
                    alt={avatarAlt}
                    fill
                    sizes="(min-width: 1024px) 28rem, (min-width: 640px) 18rem, 16rem"
                    priority
                    unoptimized={process.env.NODE_ENV !== "production"}
                  />
                </div>

                {/* Decoration Dot */}
                <div className="absolute right-4 top-4 z-20">
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-800/80">
                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight-light opacity-75 dark:bg-highlight-dark"></div>
                    <div className="relative inline-flex h-3 w-3 rounded-full bg-highlight-light dark:bg-highlight-dark"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-8 left-0 flex w-full justify-center">
          <div className="flex animate-bounce flex-col items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-white/70">
              {tagline}
            </span>
            <MaskIcon
              src="/svgs/Arrow_down.svg"
              size={20}
              className="text-slate-400 dark:text-white/70"
              alt={arrowAlt}
            />
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default PersonScreen
