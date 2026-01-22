"use client"

import { Locale } from "@/i18n/config"
import { DailyLog } from "@/ui/daily-logs/daily-log-list"
import { Divider, Image } from "@heroui/react"
import Link from "next/link"

interface LogArticleProps {
  log: DailyLog
  dict: any
  locale: Locale
}

export function LogArticle({ log, dict, locale }: LogArticleProps) {
  return (
    <article className="mx-auto max-w-4xl animate-slide-up px-6 py-32 md:py-48">
      {/* 头部导航与元信息容器 - 提升层级感 */}
      <header className="mb-20 space-y-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          {/* 胶囊式返回按钮 - Cyber-Organic 风格 */}
          <Link
            href={`/${locale}/daily-logs`}
            className="hover:text-highlight hover:border-highlight/30 group inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-default-400 backdrop-blur-md transition-all hover:shadow-[0_0_20px_rgba(97,185,175,0.2)]"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-1">
              ←
            </span>
            {dict.daily_log_detail.backToList}
          </Link>

          <div className="text-highlight/60 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
            <span>MEMO INDEX: {log.id.toString().padStart(2, "0")}</span>
            <span className="h-1 w-1 rounded-full bg-divider" />
            <span>{log.date}</span>
            <span className="h-1 w-1 rounded-full bg-divider" />
            <span>5 {dict.daily_log_detail.minutes}</span>
          </div>
        </div>

        <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-foreground dark:text-white md:text-8xl">
          {log.title}
        </h1>
      </header>

      {/* 主视图 - 增加悬浮阴影与有机圆角 */}
      <div className="group mb-24 overflow-hidden rounded-[3.5rem] border border-white/5 bg-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
        <Image
          alt={log.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[5s] group-hover:scale-105 md:aspect-[21/9]"
          src={log.image}
          radius="none"
        />
      </div>

      {/* 正文内容 - 优化 Typography 体验 */}
      <div className="prose prose-xl dark:prose-invert max-w-none space-y-12 px-2 font-medium leading-[2.2] tracking-tight text-foreground/80 md:px-12">
        <p className="border-highlight mb-16 border-l-4 py-2 pl-8 text-3xl font-bold italic leading-tight tracking-tighter text-foreground opacity-90 md:text-4xl">
          “{log.description}”
        </p>

        <p>
          在这个充满数字杂讯的时代，我们往往忽略了那些最纯粹的瞬间。窗外的阳光，冒着热气的咖啡，或者是屏幕上跳动的一行干净的代码。
        </p>

        <Divider className="my-20 bg-divider/20" />

        <p>
          生活的秩序感并非来自于宏大的计划，而是来自于对每一个细节的感知。正如这个页面的设计，我们去掉了所有冗余的修饰，只留下内容本身。
        </p>

        <p>
          Cyber-Organic
          不仅仅是一种视觉风格，更是一种对待技术与生活的态度：在冷峻的工业感中保留有机的温存，在极简的形态中蕴含深邃的表达。
        </p>
      </div>

      {/* 底部装饰 - 极简档案感 */}
      <footer className="mt-48 flex flex-col items-center gap-8 border-t border-divider pt-20 opacity-30">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-highlight/40 h-1.5 w-1.5 rounded-full" />
          ))}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.5em]">
          System Log Finalized — Digital Zen Protocol
        </p>
      </footer>
    </article>
  )
}
