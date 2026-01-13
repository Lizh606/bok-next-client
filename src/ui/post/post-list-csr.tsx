"use client"

import Loading from "@/app/[locale]/(app)/loading"
import dynamic from "next/dynamic"

const PostList = dynamic(() => import("./post-list"), {
  ssr: false,
  loading: () => <Loading />
})

export default PostList
