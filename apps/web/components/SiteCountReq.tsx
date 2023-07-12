"use client"

import React from "react"

import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"

const SiteCountReq = () => {
  axiosInstance.get(`${API_URL}/posts/countVisit/main`)
  return <></>
}

export default SiteCountReq
