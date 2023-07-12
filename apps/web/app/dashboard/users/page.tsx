import {cookies} from "next/headers"

import {IUser} from "@/types/users"
import {API_URL} from "@/config/constants"
import {axiosInstance} from "@/lib/refine/axiosInstance"
import {dataProvider} from "@/lib/refine/dataProvider"

import UsersListContent from "./content"

export default async function Index() {
  const initialData = await dataProvider(
    API_URL,
    axiosInstance,
    cookies().toString()
  ).getList<IUser>({
    resource: "users",
  })
  return <UsersListContent initialData={initialData}/>
}
