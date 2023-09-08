"use client"

import React from "react"

import { API_URL } from "@/config/constants"
import { axiosInstance } from "@/lib/refine/axiosInstance"
import { dataProvider } from "@/lib/refine/dataProvider"

const SiteCountReq = () => {
  dataProvider(API_URL, axiosInstance)
    .custom({
      url: `/auth/session`,
      method: "post",
    })
    .then(() => {})
  return <></>
}

export default SiteCountReq
