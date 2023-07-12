// @ts-nocheck
"use client"

import * as React from "react"
import {Timer} from "lucide-react"

import {TableOfContents} from "@/lib/toc"
import {cn} from "@/lib/utils"
import {useMounted} from "@/hooks/use-mounted"

interface TocProps {
  toc: TableOfContents
  minuteRead: number
}

export function DashboardTableOfContents({toc, minuteRead}: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
          .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
          .flat()
          .filter(Boolean)
          .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className={"flex items-center justify-between pr-4"}>
        <p className="text-center text-xl font-medium">Content</p>
        <span
          className="mt-0 flex items-center text-center font-medium"
          style={{marginTop: "0px !important"}}
        >
          <Timer className={"mr-2"}/>
          {minuteRead} minutes read
        </span>
      </div>
      <Tree tree={toc} activeItem={activeHeading}/>
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {rootMargin: `0% 0% -80% 0%`}
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({tree, level = 1, activeItem}: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", {"pl-4": level !== 1})}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-all duration-500 hover:text-foreground",
                item.url === `#${activeItem}`
                  ? "text-[16px] font-medium text-blue-600"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem}/>
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
