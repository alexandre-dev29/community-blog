import {cookies} from "next/headers"
import {GetListResponse} from "@refinedev/core"
import matter from "gray-matter"
import lqipModern from "lqip-modern"

import {ICategory} from "@/types/categories"
import {IPost} from "@/types/posts"
import {IUser} from "@/types/users"
import {API_URL} from "@/config/constants"
import GenerateMdxSource from "@/lib/GenerateMdxSource"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"

export type PostsResponse = {
  data: GetListResponse<IPost>
  featuredArticle: { data: IPost; blurImage: string }
}
const GeneratePreviewBlurImage = async (imageUrl: string) => {
  const image = await fetch(imageUrl)
  const imageBuffer = Buffer.from(await image.arrayBuffer())
  const previewImage = await lqipModern(imageBuffer)
  return previewImage.metadata.dataURIBase64
}

export async function getAllPosts(cookies: string): Promise<PostsResponse> {
  const allPosts = await dataProvider(
    API_URL,
    axiosInstance,
    cookies
  ).getList<IPost>({
    resource: "posts",
  })
  const featuredPost =
    allPosts.data.filter((value) => value.isFeatured).length === 0
      ? allPosts.data[0]
      : allPosts.data.filter((value) => value.isFeatured)[0]

  const previewImage = await GeneratePreviewBlurImage(
    featuredPost.postMainImage
  )
  return {
    data: allPosts,
    featuredArticle: {
      data: featuredPost,
      blurImage: previewImage,
    },
  }
}

type ResponseModel = {
  title: string
  slug: string
}

export async function getAllPostsForSearch(
  cookies: string
): Promise<ResponseModel[]> {
  const allPosts = await dataProvider(API_URL, axiosInstance, cookies).custom<
    IPost[]
  >({
    url: `${API_URL}/posts/getPosts/postsForSearch`,
    method: "get",
  })

  return allPosts.data.map((value) => {
    return {title: value.postTitle, slug: value.postSlug}
  })
}

export async function getAllCategories(
  cookies: string
): Promise<ResponseModel[]> {
  const allCategories = await dataProvider(
    API_URL,
    axiosInstance,
    cookies
  ).custom<ICategory[]>({
    url: `${API_URL}/categories/getCategory/getCategoriesForSearch`,
    method: "get",
  })
  return allCategories.data.map((value) => {
    return {title: value.categoryName, slug: value.categorySlug}
  })
}

export async function getCurrentPostsDatas(slug: string, cookies: string) {
  const currentPost = await dataProvider(
    API_URL,
    axiosInstance,
    cookies
  ).custom<IPost>({
    url: `${API_URL}/posts/getPosts/getPostsBySlug`,
    method: "get",
    query: {slug: `${slug}`},
  })
  const {content, data} = matter(currentPost.data.postContent)
  const mdxSource = await GenerateMdxSource(content, data)

  return {
    mdxSource: mdxSource,
    postData: currentPost.data,
  }
}

export async function getCurrentUserDatas(id: string, cookies: string) {
  const currentPost = await dataProvider(
    API_URL,
    axiosInstance,
    cookies
  ).custom<IUser>({
    url: `${API_URL}/users/getUser/getUserById`,
    method: "get",
    query: {id: `${id}`},
  })

  let previewImage = undefined
  if (currentPost.data.avatarImage) {
    previewImage = await GeneratePreviewBlurImage(
      `${currentPost.data.avatarImage}`
    )
  }
  return {
    userData: currentPost.data,
    mainImagePreview: previewImage,
  }
}

export async function getCurrentCategoryDatas(slug: string, cookies: string) {
  return await dataProvider(API_URL, axiosInstance, cookies).custom<ICategory>({
    url: `${API_URL}/categories/getCategory/getCategoryBySlug`,
    method: "get",
    query: {slug: `${slug}`},
  })
}

export const getPostsForDashBoard = async (cookies: string) => {
  return await dataProvider(API_URL, axiosInstance, cookies).custom<IPost[]>({
    url: `${API_URL}/posts/getPosts/allPosts`,
    method: "get",
  })
}
