import React from "react"

import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"

export default async function LoadingPage() {
  return (
    <>
      <section className="container grid grid-cols-12 items-center py-28">
        <div className="order-1 col-span-12 grid items-center gap-6 pb-8 pt-6 md:col-start-1 md:col-end-7 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <Skeleton className="h-8 w-full  bg-gray-200 dark:bg-gray-800"/>
            <Skeleton className="h-8 w-1/2  bg-gray-200 dark:bg-gray-800"/>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"/>
            <h3 className="text-lg font-extrabold leading-tight tracking-tighter text-muted-foreground">
              <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            </h3>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          </div>
        </div>
        <div
          className={
            "col-span-12 w-full md:order-2 md:col-start-8 md:col-end-12 md:block"
          }
        >
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="h-full w-full bg-gray-200 dark:bg-gray-800"/>
          </AspectRatio>
        </div>
      </section>
      <Separator/>
      <section
        className="container grid grid-cols-1 gap-x-8 gap-y-16 py-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3">
        {[1, 2, 3, 4].map((value, index) => (
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
                  <Skeleton className="h-5 w-full  bg-gray-100"/>
                </h3>
              </div>
              <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            </CardFooter>
          </Card>
        ))}
      </section>
    </>
  )
}
