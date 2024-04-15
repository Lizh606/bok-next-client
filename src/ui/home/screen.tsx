"use client"
import { clsxm } from "@/lib/helper"
import { useInView } from "framer-motion"
import { forwardRef, useRef, type PropsWithChildren } from "react"
const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    className?: string
  }>
>((props, ref) => {
  const inViewRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(inViewRef, { once: true })

  return (
    <div
      ref={ref}
      className={clsxm(
        "relative flex flex-col overflow-hidden",
        props.className
      )}
    >
      <span ref={inViewRef} />
      {inView && props.children}
    </div>
  )
})
Screen.displayName = "Screen"
export default Screen
