import { visit } from "unist-util-visit"

export default function rehypeAttachRawToPre() {
  return (tree) => {
    visit(tree, (node) => {
      if (node?.type !== "element") return
      if (!("properties" in node) || !node.properties) return
      if (!("data-rehype-pretty-code-fragment" in node.properties)) return

      for (const child of node.children || []) {
        if (child?.tagName === "pre") {
          child.properties = { ...child.properties, raw: node.raw }
        }
      }
    })
  }
}
