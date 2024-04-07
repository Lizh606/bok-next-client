import { getPostsBySort } from "@/lib/posts"
import Link from "next/link"

type Props = {
  params: { sort: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Sort({ params }: Props) {
  const posts = getPostsBySort(params.sort)

  return (
    <div>
      {posts?.map((post: any) => (
        <Link
          href={`/posts/${params.sort}/${post.slug}`}
          className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up "
          key={post.slug}
        >
          <div className="text-xl text-gray-600 group-hover:text-brand truncate ease-in duration-300">
            {post.slug}
          </div>
          {/* <time className="text-gray-400 text-sm leading-none flex items-center">
            {post.meta?.date?.toString()}
          </time> */}
        </Link>
      ))}
    </div>
  )
}
