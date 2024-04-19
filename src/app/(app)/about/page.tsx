import Social from "@/components/Social"
import Image from "next/image"

export default function About() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <h1 className="text-4xl font-bold text-center pb-6 border-b border-solid border-gray-300">
        关于我
      </h1>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-1 flex flex-col gap-4 items-center">
          <Image
            className="rounded-full"
            src={"/images/avg.png"}
            alt="头像"
            width={240}
            height={240}
          ></Image>
          <span className="text-2xl font-bold">{process.env.BOK_AUTHOR}</span>
          <span className="text-default-500">Web/WebGIS前端工程师</span>
          <span className="text-default-500">
            积累工作与学习的经验，记录前端工程师的成长
          </span>
          <Social svgClassName="w-8 h-8"></Social>
        </div>
        <section className="col-span-2 ml-16">
          <ul
            role="list"
            className="marker:text-primary-300 list-disc pl-5 space-y-3 text-default-600"
          >
            <li>
              <p className="font-bold">姓名：李泽航</p>
            </li>
            <li>
              <p>坐标：上海</p>
            </li>
            <li>
              <p>籍贯：福建莆田</p>
            </li>
            <li>
              <p>自述：前端工程师一枚，正在努力学习Node全栈</p>
            </li>
            <li>
              <p>技能：</p>
              <ul className="marker:text-primary-300 list-disc pl-8 pt-4 space-y-3 text-default-600">
                <li>
                  前端：Vue2/3、NextJS（React）、TailwindCSS、ElementUI、微前端
                </li>
                <li>后端：NestJS、TypeORM</li>
                <li>数据库：MySQL</li>
                <li>其他：Vite、TypeScript</li>
              </ul>
            </li>
            <li>
              <p>工作历程：</p>
              <ul className="marker:text-primary-300 list-disc pl-8 pt-4 space-y-3 text-default-600">
                <li>
                  <span className="font-bold text-default-700 text-[1.1rem]">
                    2021.12-present
                  </span>{" "}
                  上海数慧技术有限公司（超图软件）
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
