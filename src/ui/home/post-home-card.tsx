"use client"

import useHover from "@/hooks/useHover"
import type { Post } from "@/lib/post"
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
import DateIcon from "~/svgs/时间.svg"
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
  index
}: {
  post: Post
  index: number
}) {
  const { isHover, bind } = useHover()
  const displayDate = post.date ? getMonthDay(post.date) : ""
  const tags =
    post.tag
      ?.split(/[,，\s]+/)
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.4
      }}
    >
      <Link
        href={`posts/${post.sort}/${post.id}`}
        className="block w-full max-w-[520px]"
        {...bind}
      >
        <div className="group relative">
          <div
            className={clsx(
              "absolute inset-0 -z-10 rounded-[30px] transition duration-500 group-hover:translate-y-1",
              "bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-[0_12px_32px_rgba(15,23,42,0.08)] group-hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]",
              "dark:from-[#141b2f] dark:via-[#0d1426] dark:to-[#060910] dark:shadow-[0_12px_32px_rgba(0,0,0,0.45)] dark:group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
            )}
          />
          <div
            className={clsx(
              "relative overflow-hidden rounded-[26px] border p-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-500",
              "border-slate-100 bg-white group-hover:border-highlight-light/70 group-hover:bg-gradient-to-br group-hover:from-highlight-light/20 group-hover:via-white group-hover:to-highlight-light/10 group-hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)]",
              "dark:border-slate-600 dark:bg-gradient-to-br dark:from-[#2d3347]/90 dark:via-[#242b41] dark:to-[#141c2d]/90 dark:shadow-[0_10px_28px_rgba(0,0,0,0.45)]",
              "dark:group-hover:to-[#f472b6]/18 group-hover:to-highlight-light/10 dark:group-hover:border-highlight-dark/70 dark:group-hover:bg-gradient-to-br dark:group-hover:from-highlight-dark/60 dark:group-hover:via-highlight-dark/10 dark:group-hover:to-highlight-dark/60 dark:group-hover:shadow-[0_14px_36px_rgba(0,0,0,0.38)]"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={clsx(
                  "flex h-12 items-center gap-2 rounded-2xl border px-4 shadow-inner backdrop-blur",
                  "border-slate-200/80 bg-white/70 text-slate-500 shadow-white/40",
                  "dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:shadow-black/40"
                )}
              >
                <DateIcon className="h-5 w-5" />
                <span className="text-base font-semibold tracking-[0.08em]">
                  {displayDate || "--/--"}
                </span>
              </div>
              <div
                className={clsx(
                  "h-px flex-1 bg-gradient-to-r from-slate-200/90 via-slate-100/70 to-transparent",
                  "dark:from-slate-700/80 dark:via-slate-700/40 dark:to-transparent"
                )}
              />
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-highlight-light dark:text-white dark:group-hover:text-highlight-dark">
                {post.title}
              </h3>
              {post.description ? (
                <p className="text-base leading-relaxed text-slate-500 dark:text-white/60 dark:group-hover:text-highlight-dark">
                  {post.description}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm shadow-indigo-100/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:shadow-black/30 dark:group-hover:text-highlight-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-slate-500 transition-colors duration-200 group-hover:text-highlight-light dark:text-slate-200 dark:group-hover:text-highlight-dark">
                  <ReadTip show={isHover}></ReadTip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
