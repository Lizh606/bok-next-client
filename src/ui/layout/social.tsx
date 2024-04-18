"use client"
import Link from "next/link"

import Bilibili from "~/svgs/Bilibili.svg"
import Email from "~/svgs/QQ邮箱.svg"
import Github from "~/svgs/github.svg"
import WeChat from "~/svgs/微信.svg"
export default function Social() {
  return (
    <div className="flex gap-4 justify-center items-center">
      {/* <span className="font-bold text-base">联系我:</span> */}
      <Link href={"mailto:916194732@qq.com"}>
        <Email className="w-6 h-6" />
      </Link>
      <WeChat
        className="w-6 h-6 cursor-pointer"
        onClick={async () => {
          await navigator.clipboard.writeText("lizh000919")
          alert("微信号已复制到剪切板啦🫡")
        }}
      />
      <Link href={"https://github.com/Lizh606"} target="_blank">
        <Github className="w-6 h-6" />
      </Link>
      <Link
        href={"https://space.bilibili.com/1672749693?spm_id_from=333.1007.0.0"}
        target="_blank"
      >
        <Bilibili className="w-6 h-6" />
      </Link>
    </div>
  )
}
