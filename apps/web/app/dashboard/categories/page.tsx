import React from "react"
import {cookies} from "next/headers"

import {ICategory} from "@/types/categories"
import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"
import CategoryTable from "@/components/dashboard/category-table"

async function getAllCategories() {
  return await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).getList<ICategory>({
    resource: "categories",
  })
}

export default async function Index() {
  const initialData = await getAllCategories()

  return <CategoryTable allCategories={initialData.data}/>
}
