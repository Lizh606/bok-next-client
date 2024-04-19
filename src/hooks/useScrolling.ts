import { useEffect, useState } from "react"

const useScrolling = () => {
  const [scrolling, setScrolling] = useState(false)
  useEffect(() => {
    let scrollingTimer: number | NodeJS.Timeout
    const handleScroll = () => {
      console.log(222)

      setScrolling(true)
      clearTimeout(scrollingTimer)
      scrollingTimer = setTimeout(() => {
        setScrolling(false)
      }, 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrolling
}
export default useScrolling
