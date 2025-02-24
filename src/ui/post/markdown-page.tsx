"use client"
import type { Post } from "@/lib/post"
import { Card, CardBody } from "@heroui/react"
import "highlight.js/styles/atom-one-light.css"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import MarkdownNav from "./markdown-nav"
// import RemoteMdxPage from "./mdx-remote-page"
const RemoteMdxPage = dynamic(() => import("./mdx-remote-page"), {
  loading: () => <div>加载中...</div>
})
export default function MarkDownPage({ post }: { post: Post }) {
  const [tocData, setTocData] = useState({})
  // // const { isAtTop } = useScrollToTop()
  // const circleRef = useRef(null)
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start start", "end end"]
  // })
  // const [percent, setPercent] = useState(0)
  // useEffect(() => {
  //   // 当 scrollYProgress 变化时更新 percent
  //   const updatePercent = () => {
  //     const currentPercent = scrollYProgress.get()
  //     setPercent(Math.round(currentPercent * 100))
  //   }

  //   // 初始化时更新一次 percent
  //   updatePercent()

  //   // 监听 scrollYProgress 的变化，并更新 percent
  //   const unsubscribe = scrollYProgress.onChange(updatePercent)

  //   // 组件卸载时取消监听
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [scrollYProgress]) // 依赖于 scrollYProgress 的变化
  const ref = useRef(null)

  return (
    <>
      <div className="markdown col-span-3" ref={ref}>
        <RemoteMdxPage post={post} setTocData={setTocData}></RemoteMdxPage>
      </div>
      <div className="block">
        <Card className="sticky top-24">
          <CardBody className="relative flex h-full max-h-[60vh] flex-col gap-4 overflow-visible py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-default-900">目录</h3>
              {/* <div
                className={clsxm(
                  "flex flex-col gap-2",
                  isAtTop ? "hidden" : "flex"
                )}
              >
                <div className="flex gap-1 items-center">
                  <svg
                    id="progress"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-highlight-light dark:stroke-highlight-dark opacity-20 "
                    />
                    <motion.circle
                      ref={circleRef}
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-highlight-light dark:stroke-highlight-dark "
                      style={{ pathLength: scrollYProgress }}
                    />
                  </svg>
                  <span className="text-default-400">{percent}%</span>
                </div>
              </div> */}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <MarkdownNav {...tocData}></MarkdownNav>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
