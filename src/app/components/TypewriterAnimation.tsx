"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TypewriterAnimationProps {
  text: string
}
const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({ text }) => {
  const [animatedText, setAnimatedText] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      if (animatedText.length < text.length) {
        setAnimatedText((prevText) => prevText + text[animatedText.length])
      } else {
        clearInterval(interval)
      }
    }, 80) // 调整打字速度，单位是毫秒
    return () => clearInterval(interval)
  }, [animatedText, text])
  return (
    <motion.div
      initial={{ opacity: 0.0001, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      {animatedText}
    </motion.div>
  )
}
export default TypewriterAnimation
