"use client"

import React from "react"
import Link from "next/link"
import { useAppSelectedMenuState } from "@/states/state-management"
import { CanAccess, useLogout } from "@refinedev/core"
import { LogOut } from "lucide-react"

import { NavSideBarProps } from "@/types/uiTypes"
import { firstMenuList } from "@/config/datas"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Sidebar = ({ sidebarWidth, navBarHeight }: NavSideBarProps) => {
  const { menuSelected, setSelectedMenu } = useAppSelectedMenuState()
  const { mutate: mutateLogout } = useLogout()
  return (
    <aside
      className={`z-40 h-screen border-r-2 bg-background shadow-md`}
      style={{
        left: 0,
        width: `${sidebarWidth - 1}px`,
      }}
    >
      <div className={""}>
        <div className={"flex items-center"}>
          <ul
            className={
              "flex h-[80px] w-full flex-col items-center justify-between"
            }
          >
            {firstMenuList.map((element, index) => (
              <CanAccess
                key={index}
                action={""}
                resource={element.text.toLowerCase()}
                params={{ resource: { name: element.text.toLowerCase() } }}
              >
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li
                        className={"mt-10 cursor-pointer"}
                        onClick={() => {
                          setSelectedMenu(element.text)
                        }}
                      >
                        <Link href={element.link}>
                          {
                            <element.IconElement
                              className={`${
                                element.text == menuSelected ? "scale-1250" : ""
                              } transition-all duration-500`}
                            />
                          }
                        </Link>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{element.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CanAccess>
            ))}
            <TooltipProvider key={3}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li
                    className={"mt-10 cursor-pointer"}
                    onClick={() => mutateLogout()}
                  >
                    <LogOut />
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
