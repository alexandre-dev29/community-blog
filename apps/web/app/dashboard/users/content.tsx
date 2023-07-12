"use client"

import React from "react"
import Link from "next/link"
import {CanAccess, GetListResponse} from "@refinedev/core"

import {IUser} from "@/types/users"
import UserListCard from "@/components/common/UserListCard"

const UsersListContent = ({
                            initialData,
                          }: {
  initialData: GetListResponse<IUser>
}) => {
  return (
    <div className={"p-4"}>
      <div className={"flex justify-between"}>
        <h3 className={"text-2xl font-extrabold"}>User List</h3>
        <CanAccess action={"Create"} resource={"categories"}>
          <Link
            href={"/dashboard/users/create"}
            className={
              "rounded-lg bg-teal-600 px-4 py-2 text-white transition-all duration-500 hover:scale-105"
            }
          >
            Create User
          </Link>
        </CanAccess>
      </div>
      <div
        className={
          "mt-4 grid grid-cols-1 gap-4 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5"
        }
      >
        {initialData.data.map((value) => (
          <UserListCard userInformation={value} key={value.id}/>
        ))}
      </div>
    </div>
  )
}

export default UsersListContent
