import MaskIcon from "@/components/MaskIcon"

type WithIconTimeProps = {
  time: string | Date
  alt?: string
}

export default function WithIconTime({ time, alt }: WithIconTimeProps) {
  return (
    <div className="flex gap-1 items-center">
      <MaskIcon
        src="/svgs/time.svg"
        size={16}
        className="w-4 h-4 text-default-700"
        alt={alt}
      />
      <p className="font-semibold">{time.toString()}</p>
    </div>
  )
}
