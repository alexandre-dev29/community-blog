import {cookies} from "next/headers"

import {IUser} from "@/types/users"
import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"

import ProfileViewContent from "./content"

export default async function Index() {
  const initialData = await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).custom<IUser>({
    url: `${API_URL}/users/profile/me`,
    method: "get",
  })
  return <ProfileViewContent initialData={initialData}/>
}
