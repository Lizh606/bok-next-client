// next.config.mjs
import createMDX from "@next/mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          // theme: {
          //   dark: "github-dark-dimmed",
          //   light: "github-light"
          // },
          keepBackground: true
        }
      ],
      rehypeSlug
    ]
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
