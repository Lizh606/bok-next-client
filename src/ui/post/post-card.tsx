"use client"
import useHover from "@/hooks/useHover"
import type { Post } from "@/lib/post"
import { formatDate } from "@/utils/date"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Link from "next/link"
import ReadTip from "./read-tip"
export default function PostCard({
  post,
  index
}: {
  post: Post
  index: number
}) {
  const { isHover, bind } = useHover()
  const { theme } = useTheme()
  const currentTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
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
        <Link
          href={`/posts/${post.sort}/${post.id}`}
          className="fade-in-up flex cursor-pointer flex-col gap-2 overflow-hidden no-underline transition"
          {...bind}
        >
          <div
            className={clsx(
              "truncate text-2xl font-bold text-default-600 duration-300 ease-in"
            )}
          >
            {post.title}
          </div>
          <span className="h-16 text-sm text-zinc-400">{post.description}</span>
          <div className="flex items-center justify-between text-base text-zinc-400">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {post.sort}
                <span style={{ display: post.tag ? "" : "none" }}>|</span>
                {post.tag}
              </div>
              <div> {post.date ? formatDate(post.date) : ""}</div>
            </div>
            <ReadTip show={isHover}></ReadTip>
          </div>
        </Link>

        <div
          className={clsx(
            isHover
              ? `${currentTheme === "light" ? "bg-highlight-light" : "bg-highlight-dark"} opacity-20 shadow-xl`
              : "opacity-0",
            "absolute left-0 top-0 -z-10 h-full w-full rounded-xl transition-opacity duration-400 ease-in-out"
          )}
        ></div>
      </div>
    </motion.div>
  )
}
