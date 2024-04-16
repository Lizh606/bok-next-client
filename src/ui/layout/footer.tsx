export default function Footer() {
  return (
    <footer className="relative z-[1] mt-32 border-t border-x-uk-separator-opaque-light bg-accent/5 py-6 text-base-content/80 dark:border-[#2B2928]">
      <div className="px-[4.5rem] flex items-center justify-center">
        <span>@2024 XiaoHang</span>
        <span className="select-none whitespace-pre opacity-50 hidden md:inline">
          |
        </span>
        <a
          target="_blank"
          href="https://console.cloud.tencent.com/beian/manage/web-app-detail?webId=1565265"
        >
          闽ICP备2024039391号
        </a>
      </div>
    </footer>
  )
}
