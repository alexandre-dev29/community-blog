"use client"

import {useState} from "react"
import {CheckCheck, ClipboardCopy, Copyright} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const CopyButton = ({text}: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? (
        <CheckCheck/>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ClipboardCopy size={18}/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </button>
  )
}
