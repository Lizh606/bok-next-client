"use client"

import { Locale } from "@/i18n/config"
import { Card, CardBody, Image } from "@heroui/react"
import Link from "next/link"

export interface DailyLog {
  id: number
  title: string
  date: string
  image: string
  description: string
}

interface DailyLogListProps {
  logs: DailyLog[]
  dict: any
  locale: Locale
}

export function DailyLogList({ logs, dict, locale }: DailyLogListProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-24">
      {logs.map((log) => (
        <article
          key={log.id}
          className="group relative flex flex-col items-center gap-12 md:flex-row"
        >
          {/* 时间轴装饰 - 增加有机感 */}
          <div className="group-hover:bg-highlight/50 absolute -left-16 bottom-0 top-0 hidden w-px bg-divider transition-colors duration-1000 md:block">
            <div className="group-hover:border-highlight absolute -left-[5px] top-12 h-2.5 w-2.5 rounded-full border-2 border-divider bg-background transition-all duration-700 group-hover:scale-150" />
          </div>

          {/* 图片容器 - 移除固定高度，采用比例控制，强制剪裁 */}
          <Link
            href={`/${locale}/daily-logs/${log.id}`}
            className="w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl md:w-3/5"
          >
            <Card className="overflow-hidden border-none bg-transparent shadow-none">
              <CardBody className="overflow-hidden p-0">
                <Image
                  alt={log.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  src={log.image}
                  radius="none"
                />
              </CardBody>
            </Card>
          </Link>

          {/* 内容区域 - 重塑标题设计 */}
          <div className="w-full space-y-6 md:w-2/5">
            <div className="flex items-center gap-4">
              <span className="bg-highlight/10 text-highlight rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                MEMO
              </span>
              <span className="font-mono text-sm tracking-tighter text-default-400">
                {log.date}
              </span>
            </div>

            <Link
              href={`/${locale}/daily-logs/${log.id}`}
              className="group/title block"
            >
              <h2 className="group-hover/title:text-highlight text-4xl font-black leading-tight tracking-tight transition-all duration-500 group-hover/title:drop-shadow-[0_0_15px_rgba(97,185,175,0.5)]">
                {log.title}
              </h2>
            </Link>

            <p className="line-clamp-3 text-lg font-medium leading-relaxed text-default-500/80">
              {log.description}
            </p>

            <div className="overflow-hidden pt-4">
              <Link
                href={`/${locale}/daily-logs/${log.id}`}
                className="hover:text-highlight group/link flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-default-400 transition-colors"
              >
                Explore Story
                <span className="transition-transform duration-500 group-hover/link:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
