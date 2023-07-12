import {cookies} from "next/headers"

import {ICategory} from "@/types/categories"
import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"
import CreatePostForm from "@/app/dashboard/posts/create/create-post-form"

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
  const allCategories = await getAllCategories()

  return (
    <section className={"p-10"}>
      <CreatePostForm categoryList={allCategories.data}/>
    </section>
  )
}
