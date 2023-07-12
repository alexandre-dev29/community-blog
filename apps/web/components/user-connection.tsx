"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {useGetIdentity, useIsAuthenticated, useLogout} from "@refinedev/core"
import {Github, LayoutDashboard, Loader2, LogOut, User} from "lucide-react"

import {IUser} from "@/types/users"
import {buttonVariants} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {Icons} from "@/components/icons"

const UserConnection = () => {
  const {isLoading} = useIsAuthenticated()
  const {data: userData} = useGetIdentity<IUser>()
  const {mutate: mutateLogout} = useLogout()
  return (
    <>
      {isLoading ? (
        <Loader2 className="mr-2 h-6 w-6 animate-spin"/>
      ) : userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className={"cursor-pointer rounded-full"}
              src={`${userData?.avatarImage}`}
              alt={`${userData?.fullName} profile `}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{userData.fullName}</DropdownMenuLabel>
            <DropdownMenuLabel>{userData.email}</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <Link href={"/dashboard"}>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <LayoutDashboard className="mr-2 h-4 w-4"/>
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard/profile"}>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <User className="mr-2 h-4 w-4"/>
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className={"cursor-pointer"}>
              <Github className="mr-2 h-4 w-4"/>
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              className={"cursor-pointer"}
              onClick={() => {
                mutateLogout()
              }}
            >
              <LogOut className="mr-2 h-4 w-4"/>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/auth/login"}>
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <Icons.login className="h-5 w-5"/>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}

export default UserConnection
