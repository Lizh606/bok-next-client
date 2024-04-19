"use client"
import useScrollToTop from "@/hooks/useScrollToTop"
import { clsxm } from "@/lib/helper"
import BackTop from "~/svgs/回到顶部.svg"
export default function BackToTop() {
  const { isAtTop } = useScrollToTop()
  return (
    <div className={clsxm("flex flex-col gap-2", isAtTop ? "hidden" : "flex")}>
      <div
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth" // 平滑滚动
          })
        }}
        className={clsxm(
          "text-default-400 hover:text-default-700 items-center gap-1 cursor-pointer",
          isAtTop ? "hidden" : "flex"
        )}
      >
        <BackTop /> 回到顶部
      </div>
    </div>
  )
}
