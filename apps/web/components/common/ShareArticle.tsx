"use client"

import {Copy, Facebook, Linkedin, Send, Twitter} from "lucide-react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"

import {IPost} from "@/types/posts"
import {API_URL, FRONT_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {useToast} from "@/components/ui/use-toast"

export default function ShareArticle({postData}: { postData: IPost }) {
  const {toast} = useToast()

  const addShareCount = () => {
    axiosInstance.post(`${API_URL}/posts/postShare/setPostShareBySlug`, {
      slug: postData.postSlug,
    })
  }

  return (
    <div className={"mt-4 flex flex-col gap-4"}>
      <p className={"text-center font-bold text-muted-foreground "}>
        Share the article with your friends
      </p>
      <div className={"flex justify-around px-6"}>
        <FacebookShareButton
          title={`${postData.postTitle}`}
          url={`${FRONT_URL}/post/${postData.postSlug}`}
          onShareWindowClose={addShareCount}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Facebook
                  className={
                    "cursor-pointer transition-all duration-200 hover:scale-125 hover:text-blue-400"
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on Facebook</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FacebookShareButton>
        <LinkedinShareButton
          title={`${postData.postTitle}`}
          summary={`${postData.postDescription}`}
          source={`${FRONT_URL}/post/${postData.postSlug}`}
          url={`${FRONT_URL}/post/${postData.postSlug}`}
          onShareWindowClose={addShareCount}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Linkedin
                  className={
                    "cursor-pointer transition-all duration-200 hover:scale-105 hover:text-blue-400"
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on Linkedin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </LinkedinShareButton>

        <TwitterShareButton
          title={`${postData.postTitle}`}
          via={`${FRONT_URL}/post/${postData.postSlug}`}
          hashtags={postData.Tags.map((value) => value)}
          related={[]}
          url={`${FRONT_URL}/post/${postData.postSlug}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Twitter
                  className={
                    "cursor-pointer transition-all duration-200 hover:scale-105 hover:text-blue-600"
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on Twitter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TwitterShareButton>

        <TelegramShareButton
          url={`${FRONT_URL}/post/${postData.postSlug}`}
          title={`${postData.postTitle}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Send
                  className={
                    "cursor-pointer transition-all duration-200 hover:scale-105 hover:text-blue-600"
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on Telegram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TelegramShareButton>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Copy
                className={
                  "cursor-pointer transition-all duration-200 hover:scale-105"
                }
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${FRONT_URL}/post/${postData.postSlug}`)
                    .then((value) => {
                      toast({
                        description: "The url was copy to clipboard",
                        key: 123456,
                        title: "URL Copy",
                      })
                    })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy url</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
