import { clsxm } from "@/lib/helper"

type MaskIconProps = {
  src: string
  size?: number
  alt?: string
  className?: string
}

export default function MaskIcon({
  src,
  size = 16,
  alt,
  className
}: MaskIconProps) {
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      className={clsxm("inline-block bg-current align-middle", className)}
      style={{
        width: size,
        height: size,
        mask: `url(${src}) center/contain no-repeat`,
        WebkitMask: `url(${src}) center/contain no-repeat`
      }}
    />
  )
}
