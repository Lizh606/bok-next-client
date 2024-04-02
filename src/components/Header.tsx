"use client"
import { Tab, Tabs } from "@nextui-org/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import useScrollToTop from "../hooks/useScrollToTop"
import { ThemeSwitcher } from "./ThemeSwitcher"

export default function Header() {
  const { isAtTop } = useScrollToTop()
  const pathName = usePathname()

  const router = useRouter()
  const tabs = [
    {
      label: "首页",
      value: "/"
    },
    {
      label: "文章",
      value: "/posts"
    },
    {
      label: "归档",
      value: "/archive"
    }
  ]

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[9] h-[4.5rem] overflow-hidden transition-shadow duration-200 ${
        isAtTop
          ? ""
          : "shadow-none shadow-neutral-100 lg:shadow-sm dark:shadow-neutral-800/50 "
      } `}
    >
      <div
        style={isAtTop ? { opacity: 0 } : {}}
        className="absolute inset-0 grid transform-gpu [-webkit-backdrop-filter:saturate(180%)_blur(20px)] [backdrop-filter:saturate(180%)_blur(20px)] [backface-visibility:hidden] [border-bottom:1px_solid_rgb(187_187_187_/_20%)] "
      ></div>
      <div className="relative  px-8 mx-auto h-full grid max-w-7xl grid-cols-[4.5rem_auto_4.5rem] ">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-xl shadow-lg"
            src={"/images/avg.png"}
            alt="头像"
            width={40}
            height={40}
          ></Image>
        </div>

        <div className="flex items-center justify-center">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: `gap-6 w-full relative py-0 px-6  border-divider  ${
                isAtTop
                  ? "shadow-lg rounded-full  border-b border-[#eee] border dark:border-[#373436]"
                  : ""
              }`,
              cursor: "w-full bg-[#22d3ee] dark:bg-[pink]",
              tab: "max-w-fit",
              tabContent:
                "group-data-[selected=true]:text-[#06b6d4] dark:group-data-[selected=true]:text-[pink]"
            }}
            defaultSelectedKey={`/${pathName.split("/")[1]}`}
            onSelectionChange={(key) => {
              router.push(key as string)
            }}
          >
            {tabs.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  title={
                    <div className="flex items-center space-x-2">
                      {/* <PhotoIcon /> */}
                      <span>{tab.label}</span>
                    </div>
                  }
                />
              )
            })}
          </Tabs>
        </div>
        <div className="flex items-center justify-center">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </header>
  )
}
