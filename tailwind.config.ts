import { heroui } from "@heroui/react"
import type { Config } from "tailwindcss"
import {
  createVariableColors,
  variableColorsPlugin
} from "tailwindcss-variable-colors"
import colors from "tailwindcss/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      keyframes: {
        dropDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" }
        },
        blink: {
          "50%": { "border-color": "transparent" }
        },
        fade: {
          "0%, 100%": { opacity: "0" },
          "10%, 90%": { opacity: "1" }
        }
      },
      animation: {
        "slide-up": "slide-up 2s ease-out",
        "typing-fade":
          "typing 2s steps(40), blink 1s steps(1) infinite, fade 4s ease-in-out"
      }
    },
    colors: {
      ...createVariableColors(colors),
      ...{
        highlight: {
          light: "#61B9AF",
          dark: "pink"
        },
        gloria: {
          light: "#8A2BE2",
          dark: "#BD33A4"
        }
      }
    }
  },
  darkMode: "class",
  plugins: [
    variableColorsPlugin(colors),
    heroui({
      prefix: "heroui",
      addCommonColors: true
    })
  ]
}
export default config
