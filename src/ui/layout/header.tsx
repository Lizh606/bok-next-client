"use client"
import MaskIcon from "@/components/MaskIcon"
import useScrolling from "@/hooks/useScrolling"
import { getClientDictionary } from "@/i18n/client"
import { defaultLocale, isLocale, type Locale } from "@/i18n/config"
import { clsxm } from "@/lib/helper"
import { Tab, Tabs } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import { useAppTheme } from "../../hooks/useAppTheme"
import useScrollToTop from "../../hooks/useScrollToTop"

export default function Header() {
  const { isAtTop } = useScrollToTop()
  const pathName = usePathname()
  const { currentTheme } = useAppTheme()
  const router = useRouter()
  const scrolling = useScrolling()
  const segments = pathName.split("/").filter(Boolean)
  const locale = (
    isLocale(segments[0] ?? "") ? segments[0] : defaultLocale
  ) as Locale
  const restSegments = isLocale(segments[0] ?? "")
    ? segments.slice(1)
    : segments
  const restPath = `/${restSegments.join("/")}`
  const currentBasePath = restSegments.length > 0 ? `/${restSegments[0]}` : "/"
  const dictionary = getClientDictionary(locale)
  // 将 avatarAlt 作为派生变量，避免在 Effect 中同步更新导致的级联渲染
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>()
  const [fetchedAvatarAlt, setFetchedAvatarAlt] = useState<string | undefined>()
  const avatarAlt = fetchedAvatarAlt ?? dictionary.home.personScreen.avatarAlt

  const tabs = [
    { label: dictionary.header.home, value: "/" },
    { label: dictionary.header.posts, value: "/posts" },
    { label: dictionary.header.time, value: "/time" },
    { label: dictionary.header.about, value: "/about" }
  ]

  const buildPath = (basePath: string) => {
    return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`
  }

  // 使用派生状态替代 Effect，避免级联渲染
  const isShowName = !!currentTheme
  const zhPath = restPath === "/" ? "/zh" : `/zh${restPath}`
  const enPath = restPath === "/" ? "/en" : `/en${restPath}`

  useEffect(() => {
    const controller = new AbortController()
    const loadAvatar = async () => {
      try {
        const response = await fetch("/api/avatar", {
          signal: controller.signal
        })
        if (!response.ok) return
        const data = await response.json()
        if (data?.url) setAvatarSrc(data.url)
        if (data?.alt) setFetchedAvatarAlt(data.alt)
      } catch (error) {
        if ((error as Error).name === "AbortError") return
        console.error("Failed to load avatar media", error)
      }
    }
    loadAvatar()
    return () => controller.abort()
  }, [locale])
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
                src={avatarSrc ?? "/images/avg.png"}
                alt={avatarAlt}
                width={40}
                height={40}
                unoptimized={process.env.NODE_ENV !== "production"}
              ></Image>
              {/* <span className="text-default-700 font-bold"> */}
              {/* {process.env.NEXT_PUBLIC_BOK_NAME} */}
              {/* </span> */}
              {isShowName && (
                <Image
                  src={
                    currentTheme === "light"
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
                !scrolling || currentBasePath === "/"
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
                defaultSelectedKey={currentBasePath}
                selectedKey={currentBasePath}
                onSelectionChange={(key) => {
                  router.push(buildPath(key as string))
                }}
              >
                {tabs.map((tab) => {
                  return (
                    <Tab
                      key={tab.value}
                      title={
                        <div className="flex items-center space-x-2">
                          {/* <PhotoIcon /> */}
                          <Link href={buildPath(tab.value)}>{tab.label}</Link>
                        </div>
                      }
                    />
                  )
                })}
              </Tabs>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={locale === "zh" ? enPath : zhPath}
                className="flex h-10 items-center gap-2 rounded-[20px] border border-default-200 bg-white px-3 text-xs font-semibold uppercase tracking-wide text-default-700 transition hover:border-default-300 dark:border-default-700 dark:bg-slate-900/60 dark:text-default-100"
                aria-label="Language switch"
                scroll={true}
                prefetch={true}
              >
                <MaskIcon
                  src="/svgs/site.svg"
                  size={16}
                  className="text-default-500 dark:text-default-200"
                  alt="Language"
                />
                <span>
                  {locale === "zh"
                    ? dictionary.header.switchToEn
                    : dictionary.header.switchToZh}
                </span>
              </Link>
              <ThemeSwitcher></ThemeSwitcher>
            </div>
          </div>
        </header>
      )}
    </>
  )
}
