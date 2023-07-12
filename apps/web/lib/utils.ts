import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies"
import {clsx, type ClassValue} from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkUserConnection = (cookies: RequestCookie[]) => {
  const authCookie = cookies.filter((value) => value.name === "auth")
  const tokenCookie = cookies.filter((value) => value.name === "token")
  if (
    authCookie.length > 0 &&
    authCookie[0] &&
    authCookie[0].value &&
    tokenCookie.length > 0 &&
    tokenCookie[0]
  ) {
    return {
      authenticated: true,
    }
  }
  return {
    authenticated: false,
    logout: true,
    redirectTo: "auth/login",
  }
}
