import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 relative">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary-300 text-white px-4 py-2 text-sm transition-colors "
      >
        返回首页
      </Link>
    </main>
  )
}
