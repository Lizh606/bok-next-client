"use client"
import { motion } from "framer-motion"
import { createElement } from "react"
import { TextUpTransitionView } from "./TextUpTransitionView"

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
export type TypewriterAnimationProps = {
  config: Config
}
const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({
  config
}) => {
  return (
    <motion.div
      className="group relative leading-[4] [&_*]:inline-block"
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
    </motion.div>
  )
}
export default TypewriterAnimation
