import { visit } from "unist-util-visit"

export default function rehypeExtractRawCode() {
  return (tree) => {
    visit(tree, (node) => {
      if (node?.type !== "element" || node?.tagName !== "pre") return

      const [codeEl] = node.children || []
      if (!codeEl || codeEl.tagName !== "code") return

      const raw = codeEl.children?.[0]?.value
      if (raw) {
        node.raw = raw
      }
    })
  }
}
