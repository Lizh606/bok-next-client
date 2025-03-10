import { useEffect, useState } from "react"

const useScrollToTop = (): { isAtTop: boolean; scrollPercentage: number } => {
  const [scrollInfo, setScrollInfo] = useState({
    isAtTop: true,
    scrollPercentage: 0
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const isTop = scrollY === 0
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const scrollPercentage = scrollY / (scrollHeight - clientHeight)

      setScrollInfo({
        isAtTop: isTop,
        scrollPercentage: scrollPercentage
      })
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollInfo
}

export default useScrollToTop
