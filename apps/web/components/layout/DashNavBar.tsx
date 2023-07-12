"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {useGetIdentity} from "@refinedev/core"

import {NavSideBarProps} from "@/types/uiTypes"
import {IUser} from "@/types/users"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Icons} from "@/components/icons"
import {ThemeToggle} from "@/components/theme-toggle"
import UserConnection from "@/components/user-connection"

const NavBar = ({sidebarWidth, navBarHeight}: NavSideBarProps) => {
  const {data: user} = useGetIdentity<IUser>()

  return (
    <div
      className={`flex min-h-[40px] items-center border-b-2 bg-background shadow-md`}
      style={{height: `${navBarHeight}vh`, maxHeight: "60px"}}
    >
      <div
        className={
          "flex cursor-pointer items-center justify-center border-r-2 transition-all duration-100 hover:bg-gray-200"
        }
        style={{
          width: `${sidebarWidth}px`,
          height: `${navBarHeight}vh`,
        }}
      >
        <Link href={"/"}>
          <Icons.logo className="h-6 w-6"/>
        </Link>
      </div>
      <div className={"flex w-full items-center justify-between px-8"}>
        <div className={"flex items-center"}>
          <div className={"border-r-2 pb-2 pr-4 pt-1"}>
            <p
              className={"rounded-md bg-muted-foreground px-2 py-1 text-white"}
            >
              {user?.role}
            </p>
          </div>
          <h2 className={"ml-4 text-xl"}>{user?.fullName}</h2>
        </div>
        <nav className="flex items-center space-x-1">
          <ThemeToggle/>
          <UserConnection/>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
