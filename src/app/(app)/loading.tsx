"use client"
import { Spinner } from "@nextui-org/react"

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner
        label="心莫急，马上来咯🫵"
        color="warning"
        labelColor="warning"
        className="animate-bounce"
      />
    </div>
  )
}
