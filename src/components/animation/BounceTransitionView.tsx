import { motion } from "framer-motion"
import type React from "react"

export default function BounceTransitionView({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {children}
    </motion.div>
  )
}
