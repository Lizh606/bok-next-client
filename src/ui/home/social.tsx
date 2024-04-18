"use client"
import { clsxm } from "@/lib/helper"
import { Tooltip } from "@nextui-org/react"
import Link from "next/link"

import Bilibili from "~/svgs/Bilibili.svg"
import Email from "~/svgs/QQ邮箱.svg"
import Github from "~/svgs/github.svg"
import WeChat from "~/svgs/微信.svg"
export default function Social({
  svgClassName = "w-6 h-6"
}: {
  svgClassName?: string
}) {
  const commonClassName = clsxm("w-6 h-6 cursor-pointer", svgClassName)
  const socialConfig = [
    {
      name: "WeChat",
      icon: (
        <WeChat
          className={commonClassName}
          onClick={async () => {
            await navigator.clipboard.writeText("lizh000919")
            alert("微信号已复制到剪切板啦🫡")
          }}
        />
      )
    },
    {
      name: "Email",
      icon: <Email className={commonClassName} />,
      link: "mailto:916194732@qq.com"
    },
    {
      name: "Github",
      icon: <Github className={commonClassName} />,
      link: "https://github.com/Lizh606"
    },
    {
      name: "Bilibili",
      icon: <Bilibili className={commonClassName} />,
      link: "https://space.bilibili.com/1672749693?spm_id_from=333.1007.0.0"
    }
  ]
  return (
    <div
      style={{ display: "flex" }}
      className="gap-4 justify-center items-center "
    >
      {socialConfig.map((social) => {
        return (
          <Tooltip placement="bottom" content={social.name} key={social.name}>
            {social.link ? (
              <Link href={social.link} target="_blank">
                {social.icon}
              </Link>
            ) : (
              <div>{social.icon}</div>
            )}
          </Tooltip>
        )
      })}
    </div>
  )
}
