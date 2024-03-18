import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
export default function Posts() {
  const posts = getAllPosts()

  return (
    <div className="prose grid gap-9 m-auto">
      {posts?.map((post: any) => (
        <Link
          href={`/posts/${post.slug}`}
          className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up "
          key={post.slug}
        >
          <div className="text-xl text-gray-600 group-hover:text-brand truncate ease-in duration-300">
            {post.meta?.title}
          </div>
          <time className="text-gray-400 text-sm leading-none flex items-center">
            {post.meta?.date?.toString()}
          </time>
        </Link>
      ))}
    </div>
  )
}
