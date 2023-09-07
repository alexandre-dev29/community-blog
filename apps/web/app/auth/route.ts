import { NextResponse } from "next/server"
import cookie from "cookie"

export async function POST(request: Request, response: NextResponse) {
  const { accessToken } = await request.json()
  const cookieConstruct = cookie.serialize("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    domain:
      process.env.NODE_ENV === "production" ? "axelmwenze.dev" : "localhost",
    maxAge: 24 * 60 * 60 * 1000,
    expires: new Date(new Date().setDate(new Date().getDate() + 1)),
  })
  return new Response("success", {
    status: 200,
    headers: { "Set-Cookie": cookieConstruct },
  })
}
