"use client"
import { microReboundPreset } from "@/constants/spring"
import { motion } from "framer-motion"
import { createElement } from "react"
import Social from "../../components/Social"
import { TextUpTransitionView } from "../../components/animation/TextUpTransitionView"

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
  showSocial?: boolean
}
const InfoWriterAnimation: React.FC<InfoWriterAnimationProps> = ({
  config,
  showSocial = false
}) => {
  const titleAnimateD =
    config.title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 30

  // Calculate total delay for social icons to appear after text finishes
  const socialDelay = titleAnimateD / 1000 + 0.5

  return (
    <motion.div
      className="relative flex flex-col gap-6"
      initial={{ opacity: 0.0001, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      <div className="text-left leading-[1.4] [&_*]:inline-block">
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
      </div>

      {showSocial && (
        <motion.div
          className="mt-4 flex flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              ...microReboundPreset,
              duration: 0.5,
              delay: socialDelay
            }
          }}
        >
          <Social svgClassName="w-6 h-6"></Social>
        </motion.div>
      )}
    </motion.div>
  )
}
export default InfoWriterAnimation
