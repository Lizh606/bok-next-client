"use client"
import useScrollToTop from "@/hooks/useScrollToTop"
import { clsxm } from "@/lib/helper"
import Image from "next/image"
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
      <Image
        src="/svgs/back-to-top.svg"
        alt="Back to top"
        width={48}
        height={48}
        className="w-12 h-12"
        priority
      />
    </div>
  )
}
