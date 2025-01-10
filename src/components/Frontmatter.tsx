type FrontmatterProps = {
  date: string
  author: string
  // 其它元数据，如分类、标签、来源、阅读时长等
}

export default function Frontmatter({ date, author }: FrontmatterProps) {
  return (
    <div className="my-4 rounded-r border-l-4 border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time className="transition-colors hover:text-gray-900">{date}</time>
        </div>

        <div className="flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="transition-colors hover:text-gray-900">
            {process.env.BOK_AUTHOR}
          </span>
        </div>
      </div>
    </div>
  )
}
