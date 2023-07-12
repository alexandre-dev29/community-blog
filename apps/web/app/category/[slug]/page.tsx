import React from "react"
import {cookies} from "next/headers"

import {getCurrentCategoryDatas} from "@/lib/api-calls"
import {Separator} from "@/components/ui/separator"
import ArticleCard from "@/components/common/article-card"

export default async function Index({params}: { params: { slug: string } }) {
  const currentCategory = await getCurrentCategoryDatas(
    params.slug,
    cookies().toString()
  )

  return (
    <div className={"min-h-screen pb-20"}>
      <section
        className={
          "container flex flex-col gap-6 p-6 pb-8 md:p-12 lg:p-16  xl:py-12 "
        }
      >
        <h1
          className={`text-2xl font-extrabold leading-tight tracking-tighter md:text-5xl `}
        >
          {currentCategory.data.categoryName}
        </h1>
        <p className={"text-lg text-muted-foreground"}>
          {currentCategory.data.categoryDescription}
        </p>
      </section>
      <Separator/>
      <section className={"container mx-auto mt-12 w-11/12 xl:w-[85%] "}>
        <div
          className={
            "grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3"
          }
        >
          {currentCategory.data.posts
            .filter((value) => value.isPublished)
            .map((currentPost) => (
              <ArticleCard
                key={currentPost.id}
                currentPost={currentPost}
                withAuthor={true}
              />
            ))}
        </div>
      </section>
    </div>
  )
}
