import {cookies} from "next/headers"

import {ICategory} from "@/types/categories"
import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"
import EditCategoryForm from "@/app/dashboard/categories/edit/[id]/edit-category-form"

const getCategoryById = async (id: string) => {
  return await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).getOne<ICategory>({
    resource: "categories",
    id: id,
  })
}

export default async function Index({params}: { params: { id: string } }) {
  const initialData = await getCategoryById(params.id)

  return <EditCategoryForm categoryInitialData={initialData.data}/>
}
