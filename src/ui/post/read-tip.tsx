import MaskIcon from "@/components/MaskIcon"
import { clsxm } from "@/lib/helper"
import { useAppTheme } from "../../hooks/useAppTheme"
export default function ReadTip({ show }: { show: boolean }) {
  const { currentTheme } = useAppTheme()
  return (
    <div
      style={{ opacity: show ? "1" : "0" }}
      className="text-highlight flex items-center gap-1 whitespace-nowrap"
    >
      阅读全文
      <MaskIcon
        src="/svgs/arrow-right.svg"
        size={16}
        className={clsxm(
          "h-4 w-4",
          currentTheme === "light"
            ? "text-highlight-light"
            : "text-highlight-dark"
        )}
        alt="阅读全文"
      />
    </div>
  )
}
