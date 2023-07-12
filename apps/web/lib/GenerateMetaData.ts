import {Metadata} from "next"

import {IPost} from "@/types/posts"
import {FRONT_URL} from "@/config/constants"
import {siteConfig} from "@/config/site"

export default function GenerateMetaData({
                                           postData,
                                           isMainPage,
                                         }: {
  isMainPage: boolean
  postData?: IPost
}): Metadata {
  if (isMainPage) {
    return {
      title: `${siteConfig.name}`,
      description: "This this the community blog description",
      authors: [{name: "Axel Mwenze", url: "axelmwenze.dev"}],
      viewport: {
        minimumScale: 1,
        width: "device-width",
        initialScale: 1,
        maximumScale: 6,
      },
    }
  } else {
    if (!postData) return {}
    return {
      title: `${postData?.postTitle} | by ${
        postData?.author.fullName
      } | ${new Date(`${postData?.publishedAt}`).toUTCString()} | ${
        siteConfig.name
      }`,
      keywords: postData.Tags,
      viewport: {
        minimumScale: 1,
        width: "device-width",
        initialScale: 1,
        maximumScale: 6,
      },
      authors: [
        {
          name: postData.author.fullName,
          url: `${FRONT_URL}/author/${postData?.author.id}`,
        },
      ],
      description: postData.postDescription,
      twitter: {
        title: postData.postTitle,
        description: postData.postDescription,
        images: [postData.postMainImage],
        card: "summary_large_image",
        site: `${siteConfig.name}`,
        creator: postData.author.fullName,
      },
      creator: postData.author.fullName,
      category: "article",
      publisher: postData.author.fullName,
      other: {
        "twitter:data1": `${postData?.postReadTime} min read`,
        "twitter:tile:image": `${postData?.postMainImage}`,
        "twitter:tile:info1:icon": "Person",
        "twitter:tile:info1:text": `${postData?.author.fullName}`,
        "twitter:tile:info2:icon": "Calendar",
        "twitter:tile:info2:text": `${new Date(
          `${postData?.publishedAt}`
        ).toUTCString()}`,
        "twitter:cta": `Read on ${siteConfig.name}`,
        "article:published_time": `${postData?.publishedAt}`,
        "al:web:url": `${FRONT_URL}/post/${postData?.postSlug}`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        "max-image-preview": "large",
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          "max-image-preview": "large",
        },
      },
      openGraph: {
        siteName: siteConfig.name,
        title: postData.postTitle,
        description: postData.postDescription,
        url: `${FRONT_URL}/post/${postData.postSlug}`,
        type: "article",
        images: [
          {
            url: postData.postMainImage,
            width: 1200,
            height: 650,
            alt: postData.postTitle,
          },
        ],
      },
    }
  }
}
