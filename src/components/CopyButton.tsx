"use client"

import { useState } from "react"

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
    <button disabled={copied} onClick={onCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}
