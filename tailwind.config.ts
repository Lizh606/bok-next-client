import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"
import {
  createVariableColors,
  variableColorsPlugin
  //@ts-ignore
} from "tailwindcss-variable-colors"
import colors from "tailwindcss/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    },
    colors: {
      ...createVariableColors(colors),
      ...{
        highlight: {
          light: "#61B9AF",
          DEFAULT: "#61B9AF",
          dark: "pink"
        }
      }
    }
  },
  darkMode: "class",
  plugins: [
    variableColorsPlugin(colors),
    nextui({
      prefix: "nextui",
      addCommonColors: true
    })
  ]
}
export default config
