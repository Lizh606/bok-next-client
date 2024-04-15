import { useTheme } from "next-themes"
import ArrowDarkRight from "~/svgs/右箭头-dark.svg"
import ArrowRight from "~/svgs/右箭头.svg"
export default function ReadTip({ show }: { show: boolean }) {
  const { theme = "light" } = useTheme()
  return (
    <div
      style={{ opacity: show ? "1" : "0" }}
      className="flex items-center gap-1 whitespace-nowrap text-[#61B9AF] dark:text-[pink]"
    >
      阅读全文
      <ArrowRight
        className="w-4 h-4"
        style={{ display: theme === "light" ? "block" : "none" }}
      ></ArrowRight>
      <ArrowDarkRight
        className="w-4 h-4"
        style={{ display: theme === "dark" ? "block" : "none" }}
      ></ArrowDarkRight>
    </div>
  )
}
