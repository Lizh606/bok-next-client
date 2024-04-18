"use client"
import { microReboundPreset } from "@/constants/spring"
import { motion } from "framer-motion"
import { createElement } from "react"
import { TextUpTransitionView } from "../../components/TextUpTransitionView"
import Social from "./social"

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
    }, 0) * 30
  console.log(titleAnimateD)

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
              initialDelay={prevAllTextLength * 0.03}
              eachDelay={0.03}
            >
              {t.text}
            </TextUpTransitionView>
          )
        )
      })}
      {socialConfig && (
        <motion.div
          className="inline-block whitespace-pre"
          initial={{ transform: "translateY(10px)", opacity: 0 }}
          animate={{
            transform: "translateY(0px)",
            opacity: 1,
            transition: {
              ...microReboundPreset,
              duration: 0.1,
              delay: 0 + titleAnimateD / 1000
            }
          }}
        >
          <Social svgClassName="w-8 h-8"></Social>
        </motion.div>
      )}
    </motion.div>
  )
}
export default InfoWriterAnimation
