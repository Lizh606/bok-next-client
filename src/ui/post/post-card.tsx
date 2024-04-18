"use client"
import type { Post } from "@/lib/posts"
import { formatDate } from "@/utils/date"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState } from "react"
import ReadTip from "./read-tip"
export default function PostCard({
  post,
  index
}: {
  post: Post
  index: number
}) {
  const [isHover, setHover] = useState(false)
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }} // 初始状态，透明度为0，缩放为0.5
      animate={{ opacity: 1, scale: 1 }} // 动画状态，透明度为1，正常缩放
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.2
      }} // 过渡效果使用弹簧动画，根据索引延迟动画
    >
      <div className="relative p-4">
        {post.href && (
          <Link
            href={post.href}
            className="flex flex-col gap-2 overflow-hidden cursor-pointer no-underline transition fade-in-up"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={clsx(
                "text-2xl font-bold truncate ease-in duration-300 text-default-600"
              )}
            >
              {post.slug}
            </div>
            <span className="text-zinc-400 text-sm h-16">
              {post.meta.description}
            </span>
            <div className="flex justify-between items-center text-zinc-400 text-base">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {post.sort}
                  <span style={{ display: post.meta.tag ? "" : "none" }}>
                    |
                  </span>
                  {post.meta.tag}
                </div>
                <div> {formatDate(post.meta.date)}</div>
              </div>
              <ReadTip show={isHover}></ReadTip>
            </div>
          </Link>
        )}

        <div
          className={clsx(
            isHover
              ? `${theme === "light" ? " bg-highlight-light" : "bg-highlight-dark"} opacity-20 shadow-xl`
              : "opacity-0",
            "-z-10 rounded-xl absolute w-full h-full left-0 top-0 transition-opacity duration-400 ease-in-out "
          )}
        ></div>
      </div>
    </motion.div>
  )
}
