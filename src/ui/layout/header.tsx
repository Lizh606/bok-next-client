"use client"
import useScrolling from "@/hooks/useScrolling"
import { clsxm } from "@/lib/helper"
import { Tab, Tabs } from "@heroui/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import useScrollToTop from "../../hooks/useScrollToTop"

export default function Header() {
  const { isAtTop } = useScrollToTop()
  const pathName = usePathname()
  const { theme } = useTheme()
  const router = useRouter()
  const scrolling = useScrolling()

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
      label: "时光",
      value: "/time"
    },
    {
      label: "关于",
      value: "/about"
    }
    // {
    //   label: "mdx",
    //   value: "/mdx"
    // },
    // {
    //   label: "mdx-remote",
    //   value: "/mdx-remote"
    // }
  ]
  const [isShowName, setShow] = useState(false)

  useEffect(() => {
    theme && setShow(true)
  }, [theme])
  return (
    <>
      {pathName.includes("mdx") ? null : (
        <header
          className={`fixed left-0 right-0 top-0 z-[9] h-[4.5rem] overflow-hidden transition-shadow duration-200 ${
            isAtTop
              ? ""
              : "shadow-none shadow-neutral-100 dark:shadow-neutral-800/50 lg:shadow-sm"
          } `}
        >
          <div
            style={isAtTop ? { opacity: 0 } : {}}
            className="absolute inset-0 grid transform-gpu [-webkit-backdrop-filter:saturate(180%)_blur(20px)] [backdrop-filter:saturate(180%)_blur(20px)] [backface-visibility:hidden] [border-bottom:1px_solid_rgb(187_187_187_/_20%)]"
          ></div>
          <div className="relative mx-auto grid h-full max-w-7xl grid-cols-[4.5rem_auto_4.5rem] px-8">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-xl shadow-lg"
                src={"/images/avg.png"}
                alt="头像"
                width={40}
                height={40}
              ></Image>
              {/* <span className="text-default-700 font-bold"> */}
              {/* {process.env.NEXT_PUBLIC_BOK_NAME} */}
              {/* </span> */}
              {isShowName && (
                <Image
                  src={
                    theme === "light"
                      ? "/images/XiaoHang.png"
                      : "/images/XiaoHang-dark.png"
                  }
                  alt={process.env.NEXT_PUBLIC_BOK_NAME as string}
                  width={80}
                  height={24}
                ></Image>
              )}
            </div>

            <div
              className={clsxm(
                "flex items-center justify-center",
                !scrolling || pathName === "/"
                  ? "animate-[dropDown_1s_ease-in-out]"
                  : "opacity-0"
              )}
            >
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
                  cursor: "w-full bg-highlight",
                  tab: "max-w-fit",
                  tabContent:
                    "group-data-[selected=true]:text-highlight-light dark:group-data-[selected=true]:text-highlight-dark"
                }}
                defaultSelectedKey={`/${pathName.split("/")[1]}`}
                selectedKey={`/${pathName.split("/")[1]}`}
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
                          <Link href={tab.value}>{tab.label}</Link>
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
      )}
    </>
  )
}
