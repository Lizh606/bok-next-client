"use client"
import { Skeleton } from "@nextui-org/react"
import { useState } from "react"

export default function About() {
  const [loading, setLoading] = useState(false)
  setTimeout(() => {
    setLoading(true)
  }, 2000)
  return (
    <Skeleton isLoaded={loading} className="rounded-lg">
      <div className="flex flex-col gap-4">
        <div>关于我</div>
        <div>……在赶啦🐎🐎</div>
        <div> 精彩还在路上！🫡</div>
      </div>
    </Skeleton>
  )
}
