import "./atom.css"
import { cookies } from "next/headers"

import { ICategory } from "@/types/categories"
import { IPost } from "@/types/posts"
import { API_URL } from "@/config/constants"
import { axiosInstance } from "@/lib/refine/axiosInstance"
import { dataProvider } from "@/lib/refine/dataProvider"
import EditPostForm from "@/app/dashboard/posts/edit/[slug]/edit-post-form"

async function getAllCategories() {
  return await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).getList<ICategory>({
    resource: "categories",
  })
}

const getPostsBySlug = async (slug: string) => {
  return await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).custom<IPost>({
    url: `${API_URL}/posts/getPosts/getPostsBySlug`,
    method: "get",
    query: { slug: `${slug}` },
  })
}
export default async function Index({ params }: { params: { slug: string } }) {
  const allCategories = await getAllCategories()
  const currentPostData = await getPostsBySlug(params.slug)

  return (
    <section className={"p-10"}>
      <EditPostForm
        categoryList={allCategories.data}
        postData={currentPostData.data}
      />
    </section>
  )
}
