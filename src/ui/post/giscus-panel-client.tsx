"use client"

import dynamic from "next/dynamic"
import type React from "react"

const GiscusPanel = dynamic(() => import("./giscus-panel"), {
  ssr: false
})

type Props = React.ComponentProps<typeof GiscusPanel>

export default function GiscusPanelClient(props: Props) {
  return <GiscusPanel {...props} />
}
