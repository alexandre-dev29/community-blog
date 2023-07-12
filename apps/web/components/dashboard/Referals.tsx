"use client"

import React from "react"
import {useList} from "@refinedev/core"

import {ICategory} from "@/types/categories"
import {Skeleton} from "@/components/ui/skeleton"
import ProgressBar from "@/components/dashboard/progress-bar"

const PropertyReferals = () => {
  const {isLoading, data: categories} = useList<ICategory>({
    resource: "categories",
  })
  const generateRandomColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return (
    <div className={"my-6 flex flex-col gap-4"}>
      {!isLoading ? (
        categories?.data.map(({id, categoryName, posts}, index) => (
          <ProgressBar
            key={index}
            title={categoryName}
            percentage={posts.length}
            color={generateRandomColor()}
          />
        ))
      ) : (
        <>
          <Skeleton className={"w-full bg-gray-100 dark:bg-gray-800"}/>
          <Skeleton className={"w-full bg-gray-100 dark:bg-gray-800"}/>
          <Skeleton className={"w-full bg-gray-100 dark:bg-gray-800"}/>
        </>
      )}
    </div>
  )
}

export default PropertyReferals
