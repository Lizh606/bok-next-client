import Loading from "@/app/[locale]/(app)/loading"
import { fetchPersonProfile } from "@/lib/person"
import { getPostList } from "@/lib/post"
import dynamicImport from "next/dynamic"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"

export const revalidate = 1800

const TimePanel = dynamicImport(() => import("@/ui/time/time-panel"), {
  loading: () => <Loading></Loading>
})
const TimePosts = dynamicImport(() => import("@/ui/time/time-posts"), {
  loading: () => <Loading></Loading>
})

const renderCountLabel = (template: string, count: number) => {
  const parts = template.split("{count}")
  if (parts.length === 1) {
    return template
  }
  return (
    <>
      {parts[0]}
      <b className="text-highlight">{count}</b>
      {parts[1]}
    </>
  )
}

export default async function Time({
  params
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const personProfile = await fetchPersonProfile(locale)
  const posts = await getPostList({ page: 1, size: 999, locale })
  return (
    <div className="flex flex-col gap-4">
      <div className="text-5xl font-extrabold">{dictionary.time.title}</div>
      <div className="text-2xl font-medium">
        {renderCountLabel(dictionary.time.countLabel, posts.length)}
      </div>
      <span className="bg-highlight h-[1px] w-1/12"></span>
      <TimePanel
        dayOfYearLabel={dictionary.time.dayOfYearLabel}
        yearProgressLabel={dictionary.time.yearProgressLabel}
        todayProgressLabel={dictionary.time.todayProgressLabel}
        nowPlayingLabel={dictionary.time.nowPlayingLabel}
        quotes={personProfile?.quotes}
      ></TimePanel>
      <TimePosts posts={posts} locale={locale}></TimePosts>
    </div>
  )
}
