import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

export async function Code({ code }: { code: string }) {
  const highlightedCode = await highlightCode(code)
  return (
    <section
      dangerouslySetInnerHTML={{
        __html: highlightedCode
      }}
    />
  )
}
const visitPlugin1 = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children
      if (codeEl.tagName !== "code") return
      node.raw = codeEl.children?.[0].value
    }
  })
}
const visitPlugin2 = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element") {
      // if (!("data-rehype-pretty-code-fragment" in node.properties)) {
      //   return
      // }
      for (const child of node.children) {
        if (child.tagName === "pre") {
          child.properties["raw"] = node.raw
        }
      }
    }
  })
}
async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(visitPlugin1)
    .use(rehypePrettyCode, {
      keepBackground: true
    })
    .use(visitPlugin2)
    .use(rehypeStringify)
    .process(code)

  return String(file)
}
