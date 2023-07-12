import React from "react"
import Image from "next/image"
import Link from "next/link"

import {IPost} from "@/types/posts"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import CustomMainImage from "@/components/images/custom-main-image"

const ArticleCard = ({
                       withAuthor,
                       currentPost,
                     }: {
  currentPost: IPost
  withAuthor: boolean
}) => {
  return (
    <Card className={""}>
      <CardHeader className={"max-h-[400px] p-0 pb-2"}>
        <AspectRatio ratio={16 / 9}>
          <CustomMainImage
            postTitle={"Alexandre"}
            postImageSrc={currentPost.postMainImage}
            hasBlurImage={false}
            customClassName={"rounded-t-lg"}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link
          href={`/category/${currentPost.Category?.categorySlug}`}
          className="text-lg font-extrabold leading-tight tracking-tighter text-muted-foreground  md:text-xl"
        >
          {currentPost.Category?.categoryName}
        </Link>
        <Link
          href={`/post/${currentPost.postSlug}`}
          className={
            "text-lg font-extrabold leading-tight tracking-tighter md:text-xl lg:text-2xl"
          }
        >
          {currentPost.postTitle}
        </Link>

        <div>
          <p className="line-clamp-3 text-base text-muted-foreground">
            {currentPost.postDescription}
          </p>
        </div>
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        {withAuthor ? (
          <div className={"flex items-center gap-4"}>
            <Image
              width={40}
              height={40}
              className={"w-[40px] rounded-full"}
              src={`${currentPost.author?.avatarImage}`}
              alt={`${currentPost.author?.fullName} profile`}
            />
            <Link
              href={`/author/${currentPost.author.id}`}
              className={
                "text-sm font-extrabold leading-tight tracking-tighter md:text-base"
              }
            >
              {currentPost.author.fullName}
            </Link>
          </div>
        ) : (
          ""
        )}
        <span className={"text-sm text-muted-foreground"}>{`${new Date(
          `${currentPost.publishedAt}`
        ).toLocaleDateString()}`}</span>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard
