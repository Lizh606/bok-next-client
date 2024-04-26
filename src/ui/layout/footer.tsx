import Link from "next/link"

import ICP from "~/svgs/备案.svg"
import Site from "~/svgs/网站.svg"
import Social from "../../components/Social"

export default function Footer() {
  const { BOK_YEAR, BOK_AUTHOR, BOK_ICP } = process.env
  return (
    <footer className="relative z-[1] mt-24 border-t py-8 dark:border-[#2B2928] text-default-600 text-xs">
      <div className="px-[4.5rem] flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Social></Social>
            <Link href={"/"} className="flex gap-1 items-center">
              <Site className="w-5 h-5" />
              {BOK_YEAR} • {BOK_AUTHOR}
            </Link>
            <Link
              target="_blank"
              href="https://beian.miit.gov.cn/#/Integrated/index"
            >
              <span className="flex gap-1 items-center">
                <ICP className="w-5 h-5" /> {BOK_ICP}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
