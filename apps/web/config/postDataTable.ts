import {z} from "zod"

export const postsSchema = z.object({
  id: z.string(),
  status: z.string(),
  postTitle: z.string(),
  postDescription: z.string(),
  categoryName: z.string(),
  postSlug: z.string(),
  viewCount: z.number(),
})

export type Posts = z.infer<typeof postsSchema>
