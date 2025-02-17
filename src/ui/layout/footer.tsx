import Link from "next/link"

import ICP from "~/svgs/备案.svg"
import Site from "~/svgs/网站.svg"
import Social from "../../components/Social"

export default function Footer() {
  const { BOK_YEAR, BOK_AUTHOR, BOK_ICP } = process.env
  return (
    <footer className="relative z-[1] mt-24 border-t py-8 text-xs text-default-600 dark:border-[#2B2928]">
      <div className="flex items-center justify-center px-[4.5rem]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Social></Social>
            <Link href={"/"} className="mt-2 flex items-center gap-1">
              <Site className="h-5 w-5" />
              {BOK_YEAR} • {BOK_AUTHOR}
            </Link>
            <Link target="_blank" href="https://beian.miit.gov.cn">
              <span className="flex items-center gap-1">
                <ICP className="h-5 w-5" /> {BOK_ICP}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
