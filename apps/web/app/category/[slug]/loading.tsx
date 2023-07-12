import React from "react"

import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"

export default async function LoadingPage() {
  return (
    <div className={"min-h-screen pb-20"}>
      <section
        className={
          "container flex flex-col gap-6 p-6 pb-8 md:p-12 lg:p-16  xl:py-12 "
        }
      >
        <Skeleton className="h-10 w-full max-w-[100px]  bg-gray-200 dark:bg-gray-800"/>
        <Skeleton className="h-8 w-full  bg-gray-200 dark:bg-gray-800"/>
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
