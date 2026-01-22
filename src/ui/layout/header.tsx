"use client"
import useScrolling from "@/hooks/useScrolling"
import { getClientDictionary } from "@/i18n/client"
import { defaultLocale, isLocale, type Locale } from "@/i18n/config"
import { clsxm } from "@/lib/helper"
import { Tab, Tabs } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  Home,
  Info,
  Menu,
  MessageSquare,
  X
} from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const avatarAlt = fetchedAvatarAlt ?? dictionary.home.personScreen.avatarAlt

  const tabs = [
    { label: dictionary.header.home, value: "/", icon: Home },
    { label: dictionary.header.posts, value: "/posts", icon: BookOpen },
    { label: dictionary.header.time, value: "/time", icon: Clock },
    {
      label: dictionary.header.dailyLogs,
      value: "/daily-logs",
      icon: MessageSquare
    },
    { label: dictionary.header.about, value: "/about", icon: Info }
  ]

  const buildPath = (basePath: string) => {
    return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`
  }

  // 使用派生状态替代 Effect，避免级联渲染
  const isShowName = !!currentTheme
  const zhPath = restPath === "/" ? "/zh" : `/zh${restPath}`
  const enPath = restPath === "/" ? "/en" : `/en${restPath}`

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathName])

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-xl dark:bg-black/60 md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white/90 p-6 shadow-2xl backdrop-blur-2xl dark:bg-zinc-900/90"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    className="h-10 w-10 rounded-xl"
                    src={avatarSrc ?? "/images/avg.png"}
                    alt={avatarAlt}
                    width={40}
                    height={40}
                  />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Xiao Hang
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const isActive = currentBasePath === tab.value
                  const Icon = tab.icon
                  return (
                    <Link
                      key={tab.value}
                      href={buildPath(tab.value)}
                      className={clsxm(
                        "flex items-center gap-4 rounded-2xl p-4 transition-all duration-200",
                        isActive
                          ? "bg-highlight-light/10 text-highlight-light dark:bg-highlight-dark/10 dark:text-highlight-dark"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon
                        size={22}
                        className={clsxm(
                          isActive
                            ? "text-highlight-light dark:text-highlight-dark"
                            : "text-slate-400 dark:text-slate-500"
                        )}
                      />
                      <span className="font-medium">{tab.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-10 left-6 right-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Switch Theme
                  </span>
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Language
                  </span>
                  <Link
                    href={locale === "zh" ? enPath : zhPath}
                    className="flex h-9 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold shadow-sm dark:bg-zinc-800"
                  >
                    {locale === "zh" ? "English" : "简体中文"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:grid md:grid-cols-[4.5rem_auto_4.5rem] md:px-8">
            <div className="flex shrink-0 items-center gap-2">
              <Image
                className="h-8 w-8 rounded-lg shadow-lg md:h-10 md:w-10 md:rounded-xl"
                src={avatarSrc ?? "/images/avg.png"}
                alt={avatarAlt}
                width={40}
                height={40}
                unoptimized={process.env.NODE_ENV !== "production"}
              ></Image>
              {isShowName && (
                <div className="hidden sm:block">
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
                </div>
              )}
            </div>

            <div
              className={clsxm(
                "hidden items-center justify-center md:flex",
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
                  tabList: `gap-2 md:gap-6 w-full relative py-0 px-2 md:px-6 border-divider ${
                    isAtTop
                      ? "shadow-lg rounded-full border-b border-[#eee] border dark:border-[#373436]"
                      : ""
                  }`,
                  cursor: "w-full bg-highlight",
                  tab: "max-w-fit px-2 md:px-3",
                  tabContent:
                    "text-xs md:text-sm group-data-[selected=true]:text-highlight-light dark:group-data-[selected=true]:text-highlight-dark"
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
            <div className="hidden shrink-0 items-center justify-center gap-2 md:flex md:gap-3">
              <Link
                href={locale === "zh" ? enPath : zhPath}
                className={clsxm(
                  "group flex h-8 items-center justify-center gap-1.5 rounded-full border px-2 transition-all duration-300 md:h-9 md:px-3",
                  "border-slate-200/60 bg-white/50 backdrop-blur-md hover:scale-105 hover:bg-white hover:shadow-lg hover:shadow-highlight-light/10",
                  "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:shadow-highlight-dark/20"
                )}
                aria-label="Language switch"
                scroll={true}
                prefetch={true}
              >
                <div className="flex items-center gap-1 font-bold tracking-wider">
                  <span
                    className={clsxm(
                      "text-[9px] transition-colors md:text-[11px]",
                      locale === "zh"
                        ? "text-highlight-light dark:text-highlight-dark"
                        : "text-slate-400 dark:text-white/70"
                    )}
                  >
                    中
                  </span>
                  <div className="h-2 w-[1px] bg-slate-200 dark:bg-white/10" />
                  <span
                    className={clsxm(
                      "text-[8px] transition-colors md:text-[10px]",
                      locale === "en"
                        ? "text-highlight-light dark:text-highlight-dark"
                        : "text-slate-400 dark:text-white/70"
                    )}
                  >
                    EN
                  </span>
                </div>
              </Link>
              <ThemeSwitcher></ThemeSwitcher>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
      )}
    </>
  )
}
