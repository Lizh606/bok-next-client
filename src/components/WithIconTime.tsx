import DateIcon from "~/svgs/时间.svg"
export default function WithIconTime({ time }: { time: string | Date }) {
  return (
    <div className="flex gap-1 items-center">
      <DateIcon className="w-4 h-4 fill-default-700"></DateIcon>
      <p className="font-semibold">{time.toString()}</p>
    </div>
  )
}
