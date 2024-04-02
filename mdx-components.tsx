import { CopyButton } from "@/components/CopyButton"
import type { MDXComponents } from "mdx/types"
export const Pre = (data: any) => {
  const lang = data["data-language"]
  return (
    <pre {...data} className={"p-0 px-2 pr-2"}>
      <div className={"flex justify-end items-center gap-2"}>
        {lang}
        <CopyButton text={data.raw} />
      </div>
      {data.children}
    </pre>
  )
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { pre: Pre, ...components }
}
