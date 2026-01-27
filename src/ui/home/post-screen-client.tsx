"use client"

import type { Post } from "@/lib/post"
import type { Config } from "@/ui/home/Info-writer-animation"
import InfoWriterAnimation from "@/ui/home/Info-writer-animation"
import { motion } from "framer-motion"
import Screen from "../../components/Screen"
import PostHomeCard from "./post-home-card"

type PostScreenClientProps = {
  title: string
  publishedAlt: string
  readMore: string
  readMoreAlt: string
  intro: string
  posts: Post[]
}

export default function PostScreenClient({
  title,
  publishedAlt,
  readMore,
  readMoreAlt,
  intro,
  posts
}: PostScreenClientProps) {
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: title,
          class:
            "text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        }
      ]
    }
  } as Config

  return (
    <Screen className="relative min-h-screen overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center py-12"
            >
              <div className="relative mb-10">
                <InfoWriterAnimation config={config} />
              </div>
              <p className="max-w-xl text-lg leading-loose text-slate-500 transition-colors dark:font-medium dark:text-white/70 dark:drop-shadow-md md:text-xl">
                {intro}
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {posts
              .filter((post) => post.tag)
              .map((post, i) => {
                return (
                  <PostHomeCard
                    post={post}
                    key={post.id}
                    index={i}
                    publishedAlt={publishedAlt}
                    readMore={readMore}
                    readMoreAlt={readMoreAlt}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </Screen>
  )
}
