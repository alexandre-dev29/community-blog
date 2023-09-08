import React from "react"
import { cookies } from "next/headers"

import { getAllPosts } from "@/lib/api-calls"
import { Separator } from "@/components/ui/separator"
import SiteCountReq from "@/components/SiteCountReq"
import ArticleCard from "@/components/common/article-card"
import { FeaturedArticle } from "@/components/common/featured-article"
import { SiteHeader } from "@/components/site-header"

export default async function IndexPage() {
  const [post] = await Promise.all([getAllPosts(cookies().toString())])

  return (
    <>
      <SiteHeader />
      <section className="container grid grid-cols-12 items-center py-8  ">
        <FeaturedArticle post={post} />
      </section>
      <Separator />
      <section className="container grid grid-cols-1 gap-x-8 gap-y-16 py-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3">
        {post.data.data
          .filter((value) => value.isPublished)
          .map((currentPost) => (
            <ArticleCard
              key={currentPost.id}
              currentPost={currentPost}
              withAuthor={true}
            />
          ))}
      </section>
      <SiteCountReq />
    </>
  )
}
