"use client"
import { Spinner } from "@heroui/react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner
        label="心莫急，马上来咯"
        color="warning"
        labelColor="warning"
        className="animate-bounce"
      />
    </div>
  )
}
