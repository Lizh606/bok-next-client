// next.config.mjs
import createMDX from "@next/mdx"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**" // 允许所有域名，建议根据实际需求限制
      }
    ]
  },
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
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      resolve(__dirname, "./scripts/mdx/rehype-extract-raw.mjs"),
      [
        "rehype-pretty-code",
        {
          theme: "material-theme-lighter"
        }
      ],
      resolve(__dirname, "./scripts/mdx/rehype-attach-raw-to-pre.mjs")
    ]
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
