import { clsxm } from "@/lib/helper"
import { useTheme } from "next-themes"
import ArrowRight from "~/svgs/右箭头.svg"
export default function ReadTip({ show }: { show: boolean }) {
  const { theme = "light" } = useTheme()
  return (
    <div
      style={{ opacity: show ? "1" : "0" }}
      className="text-highlight flex items-center gap-1 whitespace-nowrap"
    >
      阅读全文
      <ArrowRight
        className={clsxm(
          "h-4 w-4",
          theme === "light" ? "fill-highlight-light" : "fill-highlight-dark"
        )}
      ></ArrowRight>
    </div>
  )
}
