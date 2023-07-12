"use client"

import React, {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {CanAccess, useDelete} from "@refinedev/core"
import {Edit, Trash} from "lucide-react"

import {ICategory} from "@/types/categories"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ArticleTable = ({allCategories}: { allCategories: ICategory[] }) => {
  const [allCurrentCategories, setAllCurrentCategories] =
    useState(allCategories)
  const {mutate, isLoading} = useDelete()
  const deleteCurrentCategory = (id: string) => {
    mutate(
      {resource: "categories", id},
      {
        onSuccess: () => {
          setAllCurrentCategories(
            allCurrentCategories.filter((value) => value.id != id)
          )
        },
      }
    )
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={"flex justify-between"}>
          <h1
            className={
              "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl"
            }
          >
            Category list
          </h1>
          <CanAccess resource={"categories"} action={"create"}>
            <Link href={"/dashboard/categories/create"}>
              <Button>Create category</Button>
            </Link>
          </CanAccess>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Table className={"mt-4"}>
          <TableHeader>
            <TableRow>
              <TableHead className="!p-4">No</TableHead>
              <TableHead className={"text-left"}>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>description</TableHead>
              <TableHead>created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {allCurrentCategories.map((value, index) => (
              <TableRow className="" key={value.id}>
                <TableCell className=" ">{index + 1}</TableCell>
                <TableCell className="">
                  <div className={"col-span-3 flex items-center gap-4"}>
                    <Image
                      src={value.mainImageUrl}
                      alt={"unsplash images"}
                      width={60}
                      height={60}
                      className={"rounded-lg shadow-lg"}
                      style={{width: "auto", height: "auto"}}
                    />
                    <Link
                      href={`/category/${value.categorySlug}`}
                      className={"font-bold "}
                      target={"_blank"}
                    >
                      {value.categoryName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{value.categorySlug}</TableCell>
                <TableCell>{value.categoryDescription}</TableCell>
                <TableCell>{`${new Date(
                  value.createdAt ?? Date.now()
                ).toLocaleDateString("en-CA")}`}</TableCell>
                <TableCell className={"flex gap-6"}>
                  <Link href={`/dashboard/categories/edit/${value.id}`}>
                    <Edit className="mr-2 h-4 w-4"/>
                  </Link>

                  <Popover>
                    <PopoverTrigger>
                      <Trash className="mr-2 h-4 w-4 text-red-400"/>
                    </PopoverTrigger>
                    <PopoverContent
                      className={"flex flex-col gap-2 text-center"}
                    >
                      <p>Are you sure to delete this category ?</p>
                      <Button
                        className={"bg-red-500"}
                        onClick={() => {
                          deleteCurrentCategory(value.id)
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ArticleTable
