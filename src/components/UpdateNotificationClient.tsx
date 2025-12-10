"use client"

import dynamic from "next/dynamic"
import type React from "react"

const UpdateNotification = dynamic(() => import("./UpdateNotification"), {
  ssr: false
})

type Props = React.ComponentProps<typeof UpdateNotification>

export default function UpdateNotificationClient(props: Props) {
  return <UpdateNotification {...props} />
}
