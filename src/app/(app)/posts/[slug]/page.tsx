import { getAllPosts, getPostBySlug } from "@/lib/posts"
import MarkDownPage from "@/ui/post/markdown-page"
import { calculateTimeDifference } from "@/utils/date"
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug)
  return { post }
}

export function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export default function Post({ params }: Props) {
  const { post } = getPost(params)
  // const { theme } = useTheme()
  return (
    <div className="max-w-7xl m-auto mt-20">
      <h1 className="text-4xl font-bold text-center text-balance mb-4">
        {post.meta.title}
      </h1>
      <div className="flex w-full items-center justify-center">
        {" "}
        <div className="flex gap-1 items-center text-default-700">
          {/* <DateIcon
            className="w-4 h-4"
            style={{ display: theme === "light" ? "block" : "none" }}
          ></DateIcon> */}
          {/* <DateDarkIcon
            className="w-4 h-4"
            style={{ display: theme === "dark" ? "block" : "none" }}
          ></DateDarkIcon> */}
          <span>{calculateTimeDifference(post.meta.date.toString())}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 relative mt-8">
        <MarkDownPage post={post}></MarkDownPage>
      </div>
    </div>
  )
}
