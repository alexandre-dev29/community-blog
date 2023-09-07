import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies"
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkUserConnection = (cookies: RequestCookie[]) => {

  const authCookie = cookies.filter((value) => value.name === "auth")
  const tokenCookie = cookies.filter((value) => value.name === "token")
  const otherCondition = process.env.NODE_ENV === "development" ? tokenCookie.length > 0 && tokenCookie[0] : true;
  if (
    authCookie.length > 0 &&
    authCookie[0] &&
    authCookie[0].value && otherCondition
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
