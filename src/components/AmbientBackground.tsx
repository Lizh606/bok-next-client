"use client"

import clsx from "clsx"
import { LucideSnowflake } from "lucide-react"
import { useEffect, useState } from "react"

type SnowFlake = {
  id: string
  size: number
  left: string
  top: string
  duration: string
  delay: string
  spinDuration: string
  opacity: number
  rotate: number
  blur?: boolean
}

const generateSnow = (count: number, isFore: boolean): SnowFlake[] =>
  [...Array(count)].map((_, i) => ({
    id: `${isFore ? "f" : "b"}-${i}`,
    size: isFore ? Math.random() * 20 + 20 : Math.random() * 6 + 6,
    left: `${Math.random() * 100}%`,
    top: `-${Math.random() * 20}%`,
    duration: `${isFore ? Math.random() * 5 + 5 : Math.random() * 10 + 10}s`,
    delay: `-${Math.random() * 20}s`,
    spinDuration: `${Math.random() * 20 + 10}s`,
    opacity: isFore ? Math.random() * 0.2 + 0.3 : Math.random() * 0.2 + 0.2,
    rotate: Math.random() * 360,
    blur: isFore
  }))

export default function AmbientBackground() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)
  const [snowflakes] = useState(() => ({
    fore: generateSnow(25, true),
    back: generateSnow(50, false)
  }))

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous setState warning
    const rafId = requestAnimationFrame(() => {
      setHasMounted(true)
    })

    const handleVisibilityChange = () =>
      setIsVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-slate-50 transition-colors duration-700 dark:bg-[#0B0C15]"
      style={{
        animationPlayState: isVisible ? "running" : "paused"
      }}
    >
      {/* Ambient Noise / Grain Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Light Mode: Ethereal Mesh Gradient */}
      <div className="dark:hidden">
        <div className="absolute left-[-15%] top-[-10%] h-[1000px] w-[1000px] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-sky-200/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[800px] w-[800px] animate-[pulse_15s_ease-in-out_infinite] rounded-full bg-amber-100/15 blur-[120px] delay-700" />
        <div className="delay-2000 absolute left-[20%] top-[40%] h-[600px] w-[600px] animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-teal-50/25 blur-[100px]" />
      </div>

      {/* Dark Mode: Aurora & Icon Snowfall */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 dark:opacity-100">
        {/* Main top-left aurora beam */}
        <div className="absolute -left-[10%] -top-[20%] h-[150%] w-[120%] -rotate-12 bg-gradient-to-br from-gloria-dark/20 via-highlight-dark/10 to-transparent blur-[100px]" />

        {/* Secondary bottom-right subtle glow (for balance) */}
        <div className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[60%] animate-[pulse_12s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.08),transparent_70%)] blur-[80px]" />

        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(138,43,226,0.15),transparent_50%)] mix-blend-screen" />
        <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,var(--tw-colors-gloria-dark)_90deg,transparent_180deg)] opacity-30 mix-blend-plus-lighter blur-[120px]" />

        {/* Snowflake Icons System */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {hasMounted && (
            <>
              {snowflakes.fore.map((snow, i) => (
                <div
                  key={snow.id}
                  className="absolute animate-snow-fall transition-opacity"
                  style={{
                    left: snow.left,
                    top: snow.top,
                    animationDuration: snow.duration,
                    animationDelay: snow.delay,
                    opacity: snow.opacity
                  }}
                >
                  <LucideSnowflake
                    className={clsx(
                      "animate-spin-slow text-white/50 mix-blend-screen shadow-white transition-all duration-1000",
                      i % 3 === 0 ? "blur-[2.5px]" : "blur-[1px]"
                    )}
                    style={{
                      width: `${snow.size}px`,
                      height: `${snow.size}px`,
                      animationDuration: snow.spinDuration,
                      transform: `rotate(${snow.rotate}deg)`
                    }}
                  />
                </div>
              ))}
              {snowflakes.back.map((snow) => (
                <div
                  key={snow.id}
                  className="absolute animate-snow-fall mix-blend-screen"
                  style={{
                    left: snow.left,
                    top: snow.top,
                    animationDuration: snow.duration,
                    animationDelay: snow.delay,
                    opacity: snow.opacity
                  }}
                >
                  <LucideSnowflake
                    className="animate-spin-slow text-white/30"
                    style={{
                      width: `${snow.size}px`,
                      height: `${snow.size}px`,
                      animationDuration: snow.spinDuration,
                      transform: `rotate(${snow.rotate}deg)`
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
