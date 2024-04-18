"use client"
import { type Post } from "@/lib/posts"
import { useState } from "react"

import WithIconTime from "@/components/WithIconTime"
import { calculateTimeDifference } from "@/utils/date"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from "@nextui-org/react"
import { motion } from "framer-motion"
import Link from "next/link"
import ReadTip from "../post/read-tip"
export default function PostHomeCard({
  post,
  index
}: {
  post: Post
  index: number
}) {
  const [isHover, setHover] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }} // 初始状态，透明度为0，缩放为0.5
      animate={{ opacity: 1, scale: 1 }} // 动画状态，透明度为1，正常缩放
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.4
      }} // 过渡效果使用弹簧动画，根据索引延迟动画
    >
      <Card
        className="w-[360px] cursor-pointer text-default-700 "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardHeader>
          {post.href && (
            <Link
              href={post.href}
              className="w-full flex gap-5 justify-between"
            >
              <div className="flex flex-col gap-1 items-start justify-center">
                <div className="text-xl font-semibold leading-none text-default-600">
                  {post.slug}
                </div>
              </div>
              <ReadTip show={isHover}></ReadTip>
            </Link>
          )}
        </CardHeader>
        <Divider />
        <CardBody className="px-3 py-2 text-small">
          <p>{post.meta.description}</p>
        </CardBody>
        <CardFooter className="gap-3 text-small">
          <WithIconTime
            time={calculateTimeDifference(post.meta.date)}
          ></WithIconTime>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
