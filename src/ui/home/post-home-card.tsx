"use client"

import useHover from "@/hooks/useHover"
import { defaultLocale, isLocale, type Locale } from "@/i18n/config"
import type { Post } from "@/lib/post"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import ReadTip from "../post/read-tip"

const getMonthDay = (date: string) => {
  const candidate = new Date(date)
  if (Number.isNaN(candidate.getTime())) return ""
  const month = `${candidate.getMonth() + 1}`.padStart(2, "0")
  const day = `${candidate.getDate()}`.padStart(2, "0")
  const year = `${candidate.getFullYear()}`
  return `${year}/${month}/${day}`
}

export default function PostHomeCard({
  post,
  index,
  publishedAlt,
  readMore,
  readMoreAlt
}: {
  post: Post
  index: number
  publishedAlt: string
  readMore: string
  readMoreAlt: string
}) {
  const { isHover, onMouseEnter, onMouseLeave, hoverRef } = useHover()
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const locale = (
    isLocale(segments[0] ?? "") ? segments[0] : defaultLocale
  ) as Locale
  const href = `/${locale}/posts/${post.sort}/${post.id}`
  const displayDate = post.date ? getMonthDay(post.date) : ""
  const tags =
    post.tag
      ?.split(/[,，\s]+/)
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }}
      className="w-full"
    >
      <Link
        href={href}
        className="block w-full"
        ref={hoverRef}
        onMouseEnter={() => {
          onMouseEnter()
          router.prefetch(href)
        }}
        onMouseLeave={onMouseLeave}
        onFocus={() => router.prefetch(href)}
      >
        <div className="group relative transition-transform duration-500 ease-out hover:-translate-y-2">
          {/* Noise/Grain Texture Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
            }}
          />

          {/* Enhanced Glow Effect */}
          <div
            className={clsx(
              "absolute -inset-[1px] -z-10 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100",
              "bg-gradient-to-br dark:from-highlight-dark/30 dark:via-gloria-dark/30 dark:to-highlight-dark/30"
            )}
          />

          <div
            className={clsx(
              "relative overflow-hidden rounded-[2rem] border p-7 transition-all duration-500",
              // Light mode: More solid to prevent ambient color bleeding
              "border-slate-200 bg-white/30 shadow-sm backdrop-blur-md hover:border-highlight-light/50 hover:bg-white/50 hover:shadow-2xl hover:shadow-highlight-light/10",
              // Dark mode: Deep Glass (Pure Transparency & Stable Contrast)
              "dark:border-white/20 dark:bg-black/10 dark:shadow-2xl dark:shadow-black/50 dark:backdrop-blur-2xl",
              "dark:hover:border-highlight-dark/50 dark:hover:bg-black/50"
            )}
          >
            <div className="flex flex-col gap-6">
              {/* Header: Date & Meta */}
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-200">
                <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 dark:bg-white/15 dark:text-white/90">
                  <Image
                    src="/svgs/time.svg"
                    alt={publishedAlt}
                    width={12}
                    height={12}
                    className="opacity-50 dark:invert"
                  />
                  <span>{displayDate || "--/--"}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="line-clamp-2 text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 transition-colors dark:text-white">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="line-clamp-3 text-base font-medium leading-relaxed text-slate-600 dark:text-white/70 dark:drop-shadow-sm">
                    {post.description}
                  </p>
                )}
              </div>

              {/* Footer: Tags & Action */}
              <div className="flex items-end justify-between gap-4 pt-3">
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={clsx(
                        "rounded-lg px-3 py-1 text-[11px] font-bold tracking-widest transition-all duration-300",
                        "bg-slate-100/50 text-slate-500 hover:bg-highlight-light/10 hover:text-highlight-light",
                        // Dark mode tags: Harmonized with glass
                        "dark:bg-white/10 dark:text-white/60 dark:hover:bg-highlight-dark/20 dark:hover:text-highlight-dark"
                      )}
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ltr:-translate-x-2 rtl:translate-x-2">
                  <ReadTip
                    show={true} // Always show interaction on hover due to opacity grouping
                    label={readMore}
                    iconAlt={readMoreAlt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
