"use client"
import { getPostById } from "@/lib/post"
import { useEffect } from "react"
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 测试客户端缓存机制
    const fetchPost = async () => {
      const post = await getPostById(26)
    }

    fetchPost()
  }, [])

  return <div className="markdown m-auto max-w-5xl">{children}</div>
}
