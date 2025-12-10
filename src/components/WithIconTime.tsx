import MaskIcon from "@/components/MaskIcon"
export default function WithIconTime({ time }: { time: string | Date }) {
  return (
    <div className="flex gap-1 items-center">
      <MaskIcon
        src="/svgs/时间.svg"
        size={16}
        className="w-4 h-4 text-default-700"
        alt="时间"
      />
      <p className="font-semibold">{time.toString()}</p>
    </div>
  )
}
