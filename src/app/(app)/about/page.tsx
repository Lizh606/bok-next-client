import Social from "@/components/Social"
import Image from "next/image"

export default function About() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h1 className="border-b border-solid border-gray-300 pb-6 text-center text-4xl font-bold">
        关于我
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="rounded-full transition-transform hover:scale-105"
            src="/images/avg.png"
            alt="头像"
            width={240}
            height={240}
            priority
          />
          <h2 className="text-2xl font-bold">{process.env.BOK_AUTHOR}</h2>
          <p className="text-default-500">Web/WebGIS前端工程师</p>
          <p className="text-center text-default-500">
            积累工作与学习的经验，记录前端工程师的成长
          </p>
          <Social svgClassName="w-8 h-8" />
        </div>
        <section className="col-span-1 md:col-span-2 md:ml-16">
          <ul
            role="list"
            className="list-disc space-y-4 pl-5 text-default-600 marker:text-primary-300"
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
              <ul className="list-disc space-y-3 pl-8 pt-4 text-default-600 marker:text-primary-300">
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
              <ul className="list-disc space-y-3 pl-8 pt-4 text-default-600 marker:text-primary-300">
                <li>
                  <span className="text-[1.1rem] font-bold text-default-700">
                    2021.12-present
                  </span>{" "}
                  北京超图软件股份有限公司（上海数慧）
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
