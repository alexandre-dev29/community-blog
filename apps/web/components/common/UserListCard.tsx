"use client"

import React from "react"
import Image from "next/image"

import {IUser} from "@/types/users"
import {Card} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const UserListCard = ({userInformation}: { userInformation: IUser }) => {
  const {fullName, email, avatarImage, biography, userTitle, role} =
    userInformation
  return (
    <Card className={"p-4"}>
      <div className="flex max-h-[350px] flex-col items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                className={`h-auto w-auto rounded-full ${
                  role === "Admin" ? "bg-green-600" : "bg-blue-600"
                } p-1 shadow-lg`}
                src={`${avatarImage}`}
                alt={`${fullName} image`}
                width={100}
                height={100}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{role === "Admin" ? "Admin" : "Editor"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <h5 className="flex flex-col items-center text-xl font-bold text-gray-600 dark:text-white">
          {fullName}
        </h5>
        <p
          className={"mt-0 flex flex-col items-center gap-2"}
          style={{marginTop: 0}}
        >
          <span className="text-md text-center text-sm text-gray-500 dark:text-gray-400">
            {userTitle}
          </span>
          <span className="text-md text-sm font-bold text-muted-foreground">
            {email}
          </span>
        </p>
        <p
          className={
            "line-clamp-3 text-center text-sm font-light text-foreground"
          }
          style={{marginTop: 0}}
        >
          {biography}
        </p>
      </div>
    </Card>
  )
}

export default UserListCard
