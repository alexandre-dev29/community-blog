import {AuthBindings} from "@refinedev/core"
import {deleteCookie} from "cookies-next"
import nookies from "nookies"

import {IAuthResponse, ResponseTypeEnum} from "@/types/uiTypes"
import {API_URL} from "@/config/constants"

import {axiosInstance} from "./axiosInstance"

const httpClient = axiosInstance
export const authProvider: AuthBindings = {
  login: async ({email, password}) => {
    const {data} = await httpClient.post<IAuthResponse>(
      `${API_URL}/users/loginUser`,
      {
        email,
        password,
      },
      {withCredentials: true}
    )

    // let myHeaders = new Headers()
    // myHeaders.append("Content-Type", "application/json")
    //
    // const response = await fetch(`${API_URL}/users/loginUser`, {
    //   credentials: "include",
    //   headers: myHeaders,
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    // })
    // const data = (await response.json()) as IAuthResponse
    if (data.responseType === ResponseTypeEnum.SUCCESS) {
      nookies.set(null, "auth", JSON.stringify(data.data), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
      return {
        success: true,
        redirectTo: "/",
      }
    }
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    }
  },
  logout: async () => {
    deleteCookie("auth")
    await httpClient.post<IAuthResponse>(`${API_URL}/users/logoutUser`)
    return {
      success: true,
      redirectTo: "/auth/login",
    }
  },
  check: async (ctx: any) => {
    const cookies = nookies.get(ctx)
    if (cookies["auth"] !== undefined && cookies["token"] !== undefined) {
      return {
        authenticated: true,
      }
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/auth/login",
    }
  },
  getPermissions: async () => {
    const auth = nookies.get()["auth"]
    if (auth) {
      const parsedUser = JSON.parse(auth)
      return parsedUser.roles
    }
    return null
  },
  getIdentity: async () => {
    const auth = nookies.get()["auth"]
    if (auth) {
      return JSON.parse(auth)
    }
    return null
  },
  onError: async (error) => {
    console.error(error)
    return {error}
  },
}
