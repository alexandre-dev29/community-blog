import {ICategory as Categories} from "./categories"
import {IUser as Users} from "./users"

export interface IPost {
  id: string

  postTitle: string

  postDescription: string

  postViewCount: number
  postReadTime: number
  postTotalLikes: number
  postTotalShares: number

  postSlug: string

  postMainImage: string

  authorId: string

  Tags: string[]

  isPublished: boolean

  isFeatured: boolean

  publishedAt?: Date

  postContent: string

  author: Users

  createdAt: Date

  updatedAt: Date

  Category?: Categories

  categoryId?: string
}
