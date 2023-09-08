import cookie from "cookie"

export async function POST(request: Request) {
  const { sessionId } = await request.json()
  const cookieConstruct = cookie.serialize("session-id", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    domain:
      process.env.NODE_ENV === "production" ? "axelmwenze.dev" : "localhost",
    maxAge: 3600000,
  })
  return new Response("verrrrryyyyyyyyyy goooooodddd", {
    status: 200,
    headers: { "Set-Cookie": cookieConstruct },
  })
}
