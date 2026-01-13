import Social from "@/components/Social"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getMediaFile, resolveAvatarMediaId } from "@/lib/media"
import { fetchPersonProfile } from "@/lib/person"
import GiscusPanel from "@/ui/post/giscus-panel-client"
import Image from "next/image"

export default async function About({
  params
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const profile = await fetchPersonProfile(locale)
  const about = profile ?? dictionary.about
  const avatarMedia = await getMediaFile(resolveAvatarMediaId())
  const avatarSrc = avatarMedia?.url
  const avatarAlt = avatarMedia?.alt as string
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h1 className="border-b border-solid border-gray-300 pb-6 text-center text-4xl font-bold">
        {about.title}
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="rounded-full transition-transform hover:scale-105"
            src={avatarSrc ?? "/images/avg.png"}
            alt={avatarAlt}
            width={240}
            height={240}
            priority
            unoptimized={process.env.NODE_ENV !== "production"}
          />
          <h2 className="text-2xl font-bold">{process.env.BOK_AUTHOR}</h2>
          <p className="text-default-500">{about.role}</p>
          <p className="text-center text-default-500">{about.intro}</p>
          <Social svgClassName="w-8 h-8" />
        </div>
        <section className="col-span-1 md:col-span-2 md:ml-16">
          <ul
            role="list"
            className="list-disc space-y-4 pl-5 text-default-600 marker:text-primary-300"
          >
            <li>
              <p className="font-bold">
                {about.nameLabel}：{about.nameValue}
              </p>
            </li>
            <li>
              <p>
                {about.locationLabel}：{about.locationValue}
              </p>
            </li>
            <li>
              <p>
                {about.hometownLabel}：{about.hometownValue}
              </p>
            </li>
            <li>
              <p>
                {about.bioLabel}：{about.bioValue}
              </p>
            </li>
            <li>
              <p>{about.skillsLabel}：</p>
              <ul className="list-disc space-y-3 pl-8 pt-4 text-default-600 marker:text-primary-300">
                {about.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </li>
            <li>
              <p>{about.workLabel}：</p>
              <ul className="list-disc space-y-3 pl-8 pt-4 text-default-600 marker:text-primary-300">
                {about.work.map((job) => (
                  <li key={`${job.range}-${job.company}`}>
                    <span className="text-[1.1rem] font-bold text-default-700">
                      {job.range}
                    </span>{" "}
                    {job.company}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>
      </div>
      <div className="mt-20">
        <GiscusPanel title={about.giscusTitle} />
      </div>
    </div>
  )
}
