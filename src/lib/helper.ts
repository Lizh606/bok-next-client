import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const clsxm = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}
