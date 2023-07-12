import React from "react"
import {cookies} from "next/headers"

import {getPostsForDashBoard} from "@/lib/api-calls"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PropertyReferals from "@/components/dashboard/Referals"
import ArticleTable from "@/components/dashboard/article-table"
import InfoCard from "@/components/dashboard/info-card"
import {Overview} from "@/components/dashboard/overview"

export default async function Index() {
  const postsData = await getPostsForDashBoard(cookies().toString())
  const totalLikes: number = postsData.data
    .map((a) => a.postTotalLikes)
    .reduce(
      (previousValue, currentValue): number => previousValue + currentValue
    )
  const totalViews: number = postsData.data
    .map((a) => a.postViewCount)
    .reduce(
      (previousValue, currentValue): number => previousValue + currentValue
    )
  return (
    <div className={"flex flex-col gap-8 px-8 py-6"}>
      <div className={"grid grid-cols-4 gap-12"}>
        <InfoCard
          title={"Total Followers"}
          value={`${totalViews}`}
          subTitle={"+20.1% from last month"}
        />
        <InfoCard
          title={"Total Articles"}
          value={`${postsData.data.length}`}
          subTitle={"+20.1% from last month"}
        />
        <InfoCard
          title={"Total Likes"}
          value={`${totalLikes}`}
          subTitle={"+20.1% from last month"}
        />
        <InfoCard
          title={"Total Shares"}
          value={`${totalLikes}`}
          subTitle={"+20.1% from last month"}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview/>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              List of categories and number of articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyReferals/>
          </CardContent>
        </Card>
      </div>
      <div
        id={"chart"}
        className={
          "flex min-h-[110px] flex-1 gap-2 rounded-md shadow-sm transition-all duration-500 hover:shadow-md "
        }
      >
        <ArticleTable allPosts={postsData.data}/>
      </div>
    </div>
  )
}
