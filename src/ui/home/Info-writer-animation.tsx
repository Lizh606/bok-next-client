"use client"
import { Tooltip } from "@nextui-org/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { createElement } from "react"
import { TextUpTransitionView } from "../../components/TextUpTransitionView"

interface Template {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "br" | "code" | "span"
  text: string
  class?: string
}
export interface Config {
  title: {
    template: Template[]
  }
}
export interface Social {
  name: string
  iconUrl: string
  href: string
}
export type InfoWriterAnimationProps = {
  config: Config
  socialConfig?: Social[]
}
const InfoWriterAnimation: React.FC<InfoWriterAnimationProps> = ({
  config,
  socialConfig
}) => {
  const titleAnimateD =
    config.title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 50

  return (
    <motion.div
      className="relative leading-[4] [&_*]:inline-block"
      initial={{ opacity: 0.0001, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      {config.title.template.map((t, i) => {
        const { type } = t
        const prevAllTextLength = config.title.template
          .slice(0, i)
          .reduce((acc, cur) => {
            return acc + (cur.text?.length || 0)
          }, 0)

        return createElement(
          type,
          { key: i, className: t.class },
          t.text && (
            <TextUpTransitionView
              initialDelay={prevAllTextLength * 0.05}
              eachDelay={0.05}
            >
              {t.text}
            </TextUpTransitionView>
          )
        )
      })}
      {socialConfig &&
        socialConfig.map((social, index) => {
          return (
            <motion.span
              key={index}
              className="inline-block whitespace-pre"
              initial={{ transform: "translateY(10px)", opacity: 0.001 }}
              animate={{
                transform: "translateY(0px)",
                opacity: 1,
                transition: {
                  duration: 0.1,
                  delay: index * 0.05 + titleAnimateD / 1000
                }
              }}
            >
              <Tooltip placement={"bottom"} content={social.name}>
                <Link
                  href={social.href}
                  className="mr-2"
                  passHref={true}
                  target="_blank"
                >
                  <Image
                    src={social.iconUrl}
                    alt={social.name}
                    width={32}
                    height={32}
                  ></Image>
                </Link>
              </Tooltip>
            </motion.span>
          )
        })}
    </motion.div>
  )
}
export default InfoWriterAnimation
