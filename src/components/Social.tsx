"use client"
import { clsxm } from "@/lib/helper"
import { Tooltip } from "@heroui/react"
import { addToast } from "@heroui/toast"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const icons = {
  bilibili: "/svgs/Bilibili.svg",
  email: "/svgs/qq-mail.svg",
  github: "/svgs/github.svg",
  wechat: "/svgs/wechat.svg"
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
  const renderContent = () => (
    <motion.div
      whileHover={{ scale: 1.2, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="relative transition-all duration-300"
    >
      <Image
        src={iconSrc}
        alt={name}
        width={32}
        height={32}
        className={clsxm(
          "h-8 w-8 transition-all duration-300",
          // Subtly brighten icons in dark mode
          "dark:brightness-125 dark:contrast-125"
        )}
        priority
      />
    </motion.div>
  )

  return (
    <Tooltip
      placement="top"
      content={name}
      offset={15}
      classNames={{
        content:
          "px-4 py-2 text-xs font-bold tracking-widest uppercase bg-white/95 dark:bg-black/80 backdrop-blur-md shadow-2xl rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
      }}
    >
      {link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer">
          {renderContent()}
        </Link>
      ) : (
        <button onClick={onClick} className="cursor-pointer">
          {renderContent()}
        </button>
      )}
    </Tooltip>
  )
}

const copyToClipboard = async (text: string) => {
  if (!text) {
    throw new Error("empty text")
  }
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  // 兼容不支持 Clipboard API 的环境
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
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
          const wechat = process.env.NEXT_PUBLIC_BOK_WECHAT || ""
          if (!wechat) {
            throw new Error("微信号未配置")
          }
          await copyToClipboard(wechat)
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
    <div className="flex flex-wrap items-center justify-center gap-4 py-2">
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
