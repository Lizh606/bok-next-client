"use client"
import useScrollToTop from "@/hooks/useScrollToTop"
import { clsxm } from "@/lib/helper"
import BackTop from "~/svgs/回到顶部.svg"
export default function BackToTop() {
  const { isAtTop } = useScrollToTop()
  return (
    <div
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth" // 平滑滚动
        })
      }}
      className={clsxm(
        "text-default-400 hover:text-default-700 items-center gap-1 cursor-pointer bg-white shadow-lg rounded-full border border-solid border-[#eee]",
        isAtTop ? "hidden" : "flex"
      )}
    >
      <BackTop className="w-12 h-12" />
    </div>
  )
}
