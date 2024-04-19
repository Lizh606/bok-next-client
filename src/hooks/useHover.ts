import { useCallback, useRef, useState } from "react"

const useHover = () => {
  const [isHover, setHover] = useState(false)
  const hoverRef = useRef(null)
  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])
  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])
  const bind = {
    onMouseEnter,
    onMouseLeave,
    ref: hoverRef
  }
  return { isHover, bind }
}
export default useHover
