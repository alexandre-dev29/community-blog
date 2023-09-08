import cookie from "cookie"

import { API_URL } from "@/config/constants"
import { axiosInstance } from "@/lib/refine/axiosInstance"

export async function POST(request: Request) {
  const { headers } = await axiosInstance.get(
    `${API_URL}/posts/countVisit/main`
  )
  let sessionId = null
  const setCookieValue = headers["set-cookie"]
  if (setCookieValue) {
    const firstValues = setCookieValue[0].split(";")[0]
    if (firstValues.includes("session-id")) {
      sessionId = firstValues.split("=")[1]
    }
  }
  const cookieConstruct = cookie.serialize("session-id", `${sessionId}`, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    domain:
      process.env.NODE_ENV === "production" ? "axelmwenze.dev" : "localhost",
    maxAge: 24 * 60 * 60 * 1000,
  })
  return new Response("verrrrryyyyyyyyyy goooooodddd", {
    status: 200,
    headers: { "Set-Cookie": cookieConstruct },
  })
}
