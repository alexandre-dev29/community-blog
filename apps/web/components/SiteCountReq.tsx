"use client"

import React from "react"

import { IPost } from "@/types/posts"
import { API_URL } from "@/config/constants"
import { axiosInstance } from "@/lib/refine/axiosInstance"
import { dataProvider } from "@/lib/refine/dataProvider"

const SiteCountReq = () => {
  dataProvider(API_URL, axiosInstance).custom<IPost[]>({
    url: `${API_URL}/posts/countVisit/main`,
    method: "get",
  })
  return <></>
}

export default SiteCountReq
