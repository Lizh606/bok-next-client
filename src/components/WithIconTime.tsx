"use client"
import { useTheme } from "next-themes"
import DateDarkIcon from "~/svgs/时间-dark.svg"
import DateIcon from "~/svgs/时间.svg"
export default function WithIconTime({ time }: { time: string | Date }) {
  const { theme } = useTheme()
  return (
    <div className="flex gap-1 items-center">
      <DateIcon
        className="w-4 h-4"
        style={{ display: theme === "light" ? "block" : "none" }}
      ></DateIcon>
      <DateDarkIcon
        className="w-4 h-4"
        style={{ display: theme === "dark" ? "block" : "none" }}
      ></DateDarkIcon>
      <p className="font-semibold">{time.toString()}</p>
    </div>
  )
}
