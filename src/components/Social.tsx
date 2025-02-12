"use client"
import { clsxm } from "@/lib/helper"
import { Tooltip } from "@heroui/react"
import { motion } from "framer-motion"
import Link from "next/link"

import toast from "react-hot-toast"
import Bilibili from "~/svgs/Bilibili.svg"
import Email from "~/svgs/QQ邮箱.svg"
import Github from "~/svgs/github.svg"
import WeChat from "~/svgs/微信.svg"

interface SocialLinkProps {
  name: string
  icon: React.ComponentType<{ className?: string }> // 或者使用具体的SVG组件类型，如typeof Bilibili
  link?: string // 使用问号表示link是可选的
  svgClassName?: string // 使用问号表示svgClassName是可选的，默认值已经在组件内部处理
  onClick?: () => Promise<void>
}

// 封装Tooltip和链接逻辑成一个独立的组件
const SocialLink = ({
  name,
  icon: Icon,
  link,
  svgClassName = "w-6 h-6",
  onClick
}: SocialLinkProps) => {
  const commonClassName = clsxm("w-6 h-6 cursor-pointer", svgClassName)
  const ToolCom = () => {
    return (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className={commonClassName}
      >
        <Icon />
      </motion.div>
    )
  }
  return (
    <Tooltip placement="bottom" content={name}>
      {link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <ToolCom />
        </Link>
      ) : (
        <div onClick={onClick}>
          <ToolCom />
        </div>
      )}
    </Tooltip>
  )
}

export default function Social({
  svgClassName = "w-6 h-6"
}: {
  svgClassName?: string
}) {
  const socialConfig = [
    {
      name: "WeChat",
      icon: WeChat,
      onClick: async () => {
        try {
          // TODO：消息弹窗暂用react-hot-toast，后续等nextUI出Toast组件更新
          await navigator.clipboard.writeText(
            process.env.NEXT_PUBLIC_BOK_WECHAT as string
          )
          toast.success("微信号已复制到剪切板啦🫡")
          console.log("微信号已复制到剪切板啦🫡")
        } catch (err) {
          toast.error(`复制到剪贴板失败:, ${err}`)
        }
      }
    },
    {
      name: "Email",
      icon: Email,
      link: `mailto:${process.env.NEXT_PUBLIC_BOK_EMAIL}`
    },
    {
      name: "Github",
      icon: Github,
      link: process.env.NEXT_PUBLIC_BOK_GITHUB
    },
    {
      name: "Bilibili",
      icon: Bilibili,
      link: process.env.NEXT_PUBLIC_BOK_BILIBILI
    }
  ]
  return (
    <div
      style={{ display: "flex" }}
      className="items-center justify-center gap-4"
    >
      {socialConfig.map((social) => {
        return (
          <SocialLink
            key={social.name}
            name={social.name}
            icon={social.icon}
            link={social.link}
            svgClassName={svgClassName}
            onClick={social.onClick}
          />
        )
      })}
    </div>
  )
}
