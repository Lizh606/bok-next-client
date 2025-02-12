"use client"

import { Button } from "@heroui/react"
import { useState } from "react"
import CopiedIcon from "../../public/svgs/copied.svg"
import CopyIcon from "../../public/svgs/copy.svg"

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  )
}

export const CopyButton1 = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      setCopied(true)
      const text = document.getElementById(id)!.innerText
      await navigator.clipboard.writeText(text)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      disabled={copied}
      onPress={onCopy}
      isIconOnly
      size="sm"
      fullWidth
      variant="light"
    >
      {copied ? (
        <CopiedIcon className="h-6 w-6" />
      ) : (
        <CopyIcon className="h-6 w-6" />
      )}
    </Button>
  )
}
