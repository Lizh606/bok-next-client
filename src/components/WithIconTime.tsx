import MaskIcon from "@/components/MaskIcon"

type WithIconTimeProps = {
  time: string | Date
  alt?: string
}

export default function WithIconTime({ time, alt }: WithIconTimeProps) {
  return (
    <div className="flex items-center gap-1">
      <MaskIcon
        src="/svgs/time.svg"
        size={16}
        className="h-4 w-4 text-default-700"
        alt={alt}
      />
      <p className="font-semibold">{time.toString()}</p>
    </div>
  )
}
