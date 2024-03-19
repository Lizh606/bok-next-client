"use client"
import BounceTransitionView from "@/app/components/BounceTransitionView"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from "@nextui-org/react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ArrowDown from "../../../../public/svgs/Arrow_down.svg"
import ArrowDarkRight from "../../../../public/svgs/右箭头-dark.svg"
import ArrowRight from "../../../../public/svgs/右箭头.svg"
import DateDarkIcon from "../../../../public/svgs/时间-dark.svg"
import DateIcon from "../../../../public/svgs/时间.svg"
import TypewriterAnimation, {
  type Config
} from "../../components/TypewriterAnimation"
import { calculateTimeDifference } from "../utils/date"
type PostData = {
  author: string
  title: string
  description: string
  content: string
  date: string
  avatarUrl: string
  tags: string[]
}

const PersonScreen = () => {
  const config = {
    title: {
      template: [
        {
          type: "h1",
          text: "Hi, I'm ",
          class: "text-4xl"
        },
        {
          type: "h1",
          text: "Hangg",
          class: "font-bold mx-2 text-4xl"
        },
        {
          type: "h1",
          text: "👻",
          class: "font-light text-4xl"
        },
        {
          type: "br"
        },
        {
          type: "h1",
          text: "A Fighting Web",
          class: "font-light text-4xl"
        },
        {
          type: "code",
          text: "<Developer />",
          class:
            "font-medium mx-2 text-3xl rounded p-1 bg-gray-200 dark:bg-gray-800/0 hover:dark:bg-gray-800/100 bg-opacity-0 hover:bg-opacity-100 transition-background duration-200"
        },
        {
          type: "span",
          class:
            "inline-block w-[1px] h-8 -bottom-2 relative bg-gray-800/80 dark:bg-gray-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animation-blink"
        },
        {
          type: "br"
        },
        {
          type: "span",
          text: "Going to A NodeJS Full Stack Developer",
          class: "font-light"
        }
      ]
    }
  } as Config
  return (
    <div className="h-screen flex relative px-6">
      <div className="flex-1 min-w-0 flex items-center justify-center">
        <TypewriterAnimation config={config}></TypewriterAnimation>
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-center">
        <Image
          className="rounded-full"
          src={"/images/avg.png"}
          alt="头像"
          width={300}
          height={300}
        ></Image>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <span>世间所有路都将与你相逢</span>
          <BounceTransitionView>
            <ArrowDown className="w-6 h-6"></ArrowDown>
          </BounceTransitionView>
        </div>
      </div>
    </div>
  )
}

const PostScreen = () => {
  const { theme } = useTheme()
  const postList: PostData[] = [
    {
      author: "ZeHang Lee",
      title: "第一篇测试博文",
      description: "测试",
      content: "This is a post",
      date: "2024-03-18",
      avatarUrl: "/images/avg.png",
      tags: ["技术", "标签"]
    },
    {
      author: "ZeHang Lee",
      title: "第一篇测试博文",
      description: "测试",
      content: "This is a post",
      date: "2024-03-19 13:15:00",
      avatarUrl: "/images/avg.png",
      tags: []
    }
  ]
  const PostCardContainer = ({
    post,
    index
  }: {
    post: PostData
    index: number
  }) => {
    const [isHover, setHover] = useState(false)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // 初始状态，透明度为0，缩放为0.5
        animate={{ opacity: 1, scale: 1 }} // 动画状态，透明度为1，正常缩放
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: index * 0.4
        }} // 过渡效果使用弹簧动画，根据索引延迟动画
      >
        <Card
          className="w-[360px] cursor-pointer text-[#A1A1AA] "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              {/* <Avatar isBordered radius="full" size="md" src="/images/avg.png" /> */}
              <div className="flex flex-col gap-1 items-start justify-center">
                <Link
                  href={"/"}
                  className="text-xl font-semibold leading-none text-default-600"
                >
                  {post.title}
                </Link>
                <h5 className="text-small tracking-tight ">@ {post.author}</h5>
              </div>
            </div>
            <div
              style={{ opacity: isHover ? "1" : "0" }}
              className="flex items-center gap-1 whitespace-nowrap text-[#61B9AF] dark:text-[pink]"
            >
              阅读全文
              <ArrowRight
                className="w-4 h-4"
                style={{ display: theme === "light" ? "block" : "none" }}
              ></ArrowRight>
              <ArrowDarkRight
                className="w-4 h-4"
                style={{ display: theme === "dark" ? "block" : "none" }}
              ></ArrowDarkRight>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="px-3 py-2 text-small">
            <p>{post.description}</p>
          </CardBody>
          <CardFooter className="gap-3 text-small">
            <div className="flex gap-1 items-center">
              <DateIcon
                className="w-4 h-4"
                style={{ display: theme === "light" ? "block" : "none" }}
              ></DateIcon>
              <DateDarkIcon
                className="w-4 h-4"
                style={{ display: theme === "dark" ? "block" : "none" }}
              ></DateDarkIcon>
              <p className="font-semibold">
                {calculateTimeDifference(post.date)}
              </p>
            </div>
            <div className="flex gap-1 items-center ">
              #
              {post.tags.map((tag, i) => {
                return <span key={i}>{tag}</span>
              })}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }
  return (
    <div className="h-screen flex relative px-6">
      <div className="flex-1 min-w-0 flex items-center justify-center z-10 text-4xl font-bold tracking-widest">
        积跬步，行千里
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-center">
        <div className="flex flex-col gap-4">
          {postList.splice(0, 4).map((post, i) => {
            return (
              <PostCardContainer
                post={post}
                key={i}
                index={i}
              ></PostCardContainer>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const GrowthScreen = () => {
  return <div className="h-screen flex relative">container:站点成长</div>
}
export default function Home() {
  return (
    <>
      <PersonScreen></PersonScreen>
      <PostScreen></PostScreen>
      <GrowthScreen></GrowthScreen>
    </>
  )
}
