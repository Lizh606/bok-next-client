import Link from "next/link"

import Email from "~/svgs/QQ邮箱.svg"
import ICP from "~/svgs/备案.svg"
import WeChat from "~/svgs/微信.svg"
import AboutMe from "~/svgs/我的.svg"
import Site from "~/svgs/网站.svg"
import LinkSvg from "~/svgs/链接.svg"

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-32 border-t py-8 dark:border-[#2B2928] text-default-600 text-xs">
      <div className="px-[4.5rem] flex items-center justify-center">
        <div className="grid grid-cols-3 w-1/2">
          <div className="flex flex-col gap-4">
            <b className="font-bold text-base h-6">关于</b>
            <Link href={"/about"} className="flex gap-1 items-center">
              <AboutMe className="w-5 h-5" />
              关于我
            </Link>
            <Link
              href={"https://github.com/Lizh606/bok-next-client.git"}
              target="_blank"
              className="flex gap-1 items-center"
            >
              <LinkSvg className="w-5 h-5" />
              关于本站
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <b className="font-bold text-base h-6">联系我</b>
            <span className="flex gap-1 items-center">
              <Email className="w-5 h-5" />
              915194732@qq.com
            </span>
            <span className="flex gap-1 items-center">
              <WeChat className="w-5 h-5" />
              lizh000919
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <b className="font-bold text-base h-6"></b>
            <span className="flex gap-1 items-center">
              <Site className="w-5 h-5" />
              @2023-2024 XiaoHang
            </span>
            <Link
              target="_blank"
              href="https://beian.miit.gov.cn/#/Integrated/index"
            >
              <span className="flex gap-1 items-center">
                <ICP className="w-5 h-5" /> 闽ICP备2024039391号
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
