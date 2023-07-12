"use client"

import React from "react"

import useReadingProgress from "@/hooks/use-reading-progress"
import {Progress} from "@/components/ui/progress"

const ReadingProgress = () => {
  const progress = useReadingProgress()
  return (
    <Progress
      value={progress}
      className={"fixed top-16 z-40 h-1 rounded-none bg-background md:h-2"}
    />
  )
}

export default ReadingProgress
