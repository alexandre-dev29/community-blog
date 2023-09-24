import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkUserConnection = (cookies: RequestCookie[]) => {
  const authCookie = cookies.filter((value) => value.name === "auth")
  const tokenCookie = cookies.filter((value) => value.name === "token")
  const otherCondition =
    process.env.NODE_ENV === "development"
      ? tokenCookie.length > 0 && tokenCookie[0]
      : true
  if (
    authCookie.length > 0 &&
    authCookie[0] &&
    authCookie[0].value &&
    otherCondition
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

export const cloudinaryUploadImage = async (file: any) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", "community-blog") // note that you must create an upload preset on your cloudinary and paste the name here
  const responseData = await axios.post(url, data)
  console.log(responseData.data)
  return responseData.data.secure_url
}

const normalizeSrc = (src: string) => (src[0] === "/" ? src.slice(1) : src)

export function cloudinaryLoader({ src, width, quality }: any) {
  const params = ["f_auto", "c_limit", "w_" + width, "q_" + (quality || "auto")]
  if (src.includes("https://res.cloudinary.com")) {
    const puredSrc = src.split(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/`
    )[1]
    console.log(puredSrc)
    return `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    }/image/upload/${params.join(",")}/${normalizeSrc(puredSrc)}`
  } else {
    return `${src}`
  }
}
