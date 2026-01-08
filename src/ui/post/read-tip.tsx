import MaskIcon from "@/components/MaskIcon"
import { clsxm } from "@/lib/helper"
import { useAppTheme } from "../../hooks/useAppTheme"

type ReadTipProps = {
  show: boolean
  label?: string
  iconAlt?: string
}

export default function ReadTip({ show, label, iconAlt }: ReadTipProps) {
  const { currentTheme } = useAppTheme()
  const text = label ?? "阅读全文"
  const altText = iconAlt ?? "阅读全文"
  return (
    <div
      style={{ opacity: show ? "1" : "0" }}
      className="text-highlight flex items-center gap-1 whitespace-nowrap"
    >
      {text}
      <MaskIcon
        src="/svgs/arrow-right.svg"
        size={16}
        className={clsxm(
          "h-4 w-4",
          currentTheme === "light"
            ? "text-highlight-light"
            : "text-highlight-dark"
        )}
        alt={altText}
      />
    </div>
  )
}
