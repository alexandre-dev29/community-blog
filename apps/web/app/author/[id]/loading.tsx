import React from "react"

import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"

export default async function LoadingPage() {
  return (
    <div className={"min-h-screen  pb-28"}>
      <section
        className={
          "flex flex-col items-center  gap-8 px-6 pb-8 md:px-32 lg:px-48 xl:px-64"
        }
      >
        <Skeleton className="h-[200px] w-[200px] justify-center rounded-full bg-gray-200 dark:bg-gray-800"/>
        <Skeleton className="h-8 w-1/6  justify-center bg-gray-200 dark:bg-gray-800"/>
        <div className={"flex w-full flex-col gap-6"}>
          <div className={"flex justify-center gap-12 text-center"}>
            <Skeleton className="h-4 w-full  justify-center bg-gray-100 dark:bg-gray-800"/>

            <Skeleton className="h-4 w-full  justify-center bg-gray-100 dark:bg-gray-800"/>
          </div>
          <p
            className={
              "px-2 text-center text-lg text-muted-foreground md:px-32"
            }
          >
            <Skeleton className="h-4 w-full  justify-center bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-4 w-full  justify-center bg-gray-100 dark:bg-gray-800"/>
          </p>
        </div>
      </section>
      <Separator/>
      <section className={"container mx-auto mt-12 w-11/12 xl:w-[85%] "}>
        <div
          className={
            "grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3"
          }
        >
          {[1, 2, 3, 4].map((value) => (
            <Card className={""} key={value}>
              <CardHeader className={"p-0"}>
                <AspectRatio ratio={16 / 9}>
                  <Skeleton className="h-full w-full bg-gray-200 dark:bg-gray-800"/>
                </AspectRatio>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Skeleton className="mt-4 h-5  w-full bg-gray-100 dark:bg-gray-800"/>
                <div className={"flex flex-col gap-2"}>
                  <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
                  <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
                  <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
                </div>
              </CardContent>
              <CardFooter className={"flex justify-between"}>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"/>
                  <h3 className="text-lg font-extrabold leading-tight tracking-tighter text-muted-foreground">
                    <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
                  </h3>
                </div>
                <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
