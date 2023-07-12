"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import {IPost} from "@/types/posts"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ArticleTable = ({allPosts}: { allPosts: IPost[] }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Table className={"mt-4"}>
          <TableHeader>
            <TableRow>
              <TableHead className="!p-4">No</TableHead>
              <TableHead className={"text-left"}>Article Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Post Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>shared</TableHead>
              <TableHead>Viewers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {allPosts.map((value, index) => (
              <TableRow className="" key={value.id}>
                <TableCell className=" ">{index + 1}</TableCell>
                <TableCell className="">
                  <div className={"col-span-3 flex items-center gap-4"}>
                    <Image
                      src={value.postMainImage}
                      alt={"unsplash images"}
                      width={60}
                      height={60}
                      className={"rounded-lg shadow-lg"}
                      style={{width: "auto", height: "auto"}}
                    />
                    <Link
                      href={`/post/${value.postSlug}`}
                      className={"font-bold "}
                      target={"_blank"}
                    >
                      {value.postTitle}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={"flex items-center"}>
                    <Image
                      src={`${value.author.avatarImage}`}
                      alt={"unsplash images"}
                      width={40}
                      height={40}
                      className={"h-[40px] w-[40px]  rounded-full shadow-lg"}
                    />
                    <p className={"ml-2 font-bold"}>Alexandre</p>
                  </div>
                </TableCell>
                <TableCell>{`${new Date(
                  value.publishedAt ?? Date.now()
                ).toLocaleDateString("en-CA")}`}</TableCell>
                <TableCell>{value.Category?.categoryName}</TableCell>
                <TableCell>{value.postTotalLikes}</TableCell>
                <TableCell>{value.postTotalShares}</TableCell>
                <TableCell>{value.postViewCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ArticleTable
