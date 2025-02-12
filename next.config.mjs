// next.config.mjs
import createMDX from "@next/mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracing: true,

  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    }) // 针对 SVG 的处理规则
    return config
  }
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") return
            node.raw = codeEl.children?.[0].value
          }
        })
      },
      [
        rehypePrettyCode,
        {
          theme: "material-theme-lighter"
        }
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }
            for (const child of node.children) {
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw
              }
            }
          }
        })
      }
    ]
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
