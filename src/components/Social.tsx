"use client"
import { clsxm } from "@/lib/helper"
import { Tooltip } from "@heroui/react"
import { addToast } from "@heroui/toast"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const icons = {
  bilibili: "/svgs/Bilibili.svg",
  email: "/svgs/QQ邮箱.svg",
  github: "/svgs/github.svg",
  wechat: "/svgs/微信.svg"
} as const

interface SocialLinkProps {
  name: string
  iconSrc: string
  link?: string // 使用问号表示link是可选的
  svgClassName?: string // 使用问号表示svgClassName是可选的，默认值已经在组件内部处理
  onClick?: () => Promise<void>
}

// 封装Tooltip和链接逻辑成一个独立的组件
const SocialLink = ({
  name,
  iconSrc,
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
        <Image
          src={iconSrc}
          alt={name}
          width={24}
          height={24}
          className={svgClassName}
          priority
        />
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
      iconSrc: icons.wechat,
      onClick: async () => {
        try {
          // TODO：消息弹窗暂用react-hot-toast，后续等nextUI出Toast组件更新
          await navigator.clipboard.writeText(
            process.env.NEXT_PUBLIC_BOK_WECHAT as string
          )
          addToast({
            title: "微信号已复制到剪切板啦🫡",
            color: "success",
            variant: "bordered",
            timeout: 3000
          })
          console.log("微信号已复制到剪切板啦🫡")
        } catch (err) {
          addToast({
            title: "复制到剪贴板失败",
            description: `复制到剪贴板失败:, ${err}`,
            color: "danger",
            variant: "bordered"
          })
        }
      }
    },
    {
      name: "Email",
      iconSrc: icons.email,
      link: `mailto:${process.env.NEXT_PUBLIC_BOK_EMAIL}`
    },
    {
      name: "Github",
      iconSrc: icons.github,
      link: process.env.NEXT_PUBLIC_BOK_GITHUB
    },
    {
      name: "Bilibili",
      iconSrc: icons.bilibili,
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
            iconSrc={social.iconSrc}
            link={social.link}
            svgClassName={svgClassName}
            onClick={social.onClick}
          />
        )
      })}
    </div>
  )
}
