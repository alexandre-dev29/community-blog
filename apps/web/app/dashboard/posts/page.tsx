import {cookies} from "next/headers"
import {GetListResponse} from "@refinedev/core"
import {z} from "zod"

import {IPost} from "@/types/posts"
import {API_URL} from "@/config/constants"
import {Posts, postsSchema} from "@/config/postDataTable"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"

import {columns} from "./column"
import {DataTable} from "./data-table"

const getAllPosts = async () => {
  return (await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).custom<IPost[]>({
    url: `${API_URL}/posts/getPosts/allPosts`,
    method: "get",
  })) as GetListResponse<IPost>
}

export default async function DemoPage() {
  const realData = await getAllPosts()
  // Fetch data from your API here.

  const data = z.array(postsSchema).parse(
    realData.data.map((value) => ({
      id: value.id,
      viewCount: value.postViewCount,
      postDescription: value.postDescription,
      status: value.isPublished ? "Published" : "Draft",
      postTitle: value.postTitle,
      categoryName: value.Category?.categoryName,
      postSlug: value.postSlug,
    }))
  )
  return <DataTable data={data}/>
}
