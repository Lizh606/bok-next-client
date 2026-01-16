"use client"

import { useCallback, useRef, useState } from "react"

const useHover = () => {
  const [isHover, setHover] = useState(false)
  const hoverRef = useRef<HTMLAnchorElement>(null)

  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  return { isHover, onMouseEnter, onMouseLeave, hoverRef }
}
export default useHover
