import React from "react"

export interface ProgresBarProps {
  title: string
  percentage: number
  color: string
}

export function ProgressBar({percentage, title, color}: ProgresBarProps) {
  return (
    <div className={"w-full"}>
      <div className={"flex items-center justify-between"}>
        <p className={"text-sm font-bold "}>{title}</p>
        <p className={"text-sm font-bold "}>{percentage}</p>
      </div>
      <div className={"relative mt-2 h-[8px] w-full rounded-md bg-[#e4e8ef]"}>
        <div
          style={{width: `${percentage}%`, backgroundColor: color}}
          className={`absolute h-full rounded-md`}
        />
      </div>
    </div>
  )
}

export default ProgressBar
