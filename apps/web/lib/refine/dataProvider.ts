import { DataProvider } from "@refinedev/core"
import { AxiosInstance } from "axios"
import stringify from "query-string"

import { axiosInstance } from "./axiosInstance"
import { generateFilter, generateSort } from "./providerDataUtils"

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
  cookies?: any
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = `${apiUrl}/${resource}`

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {}

    const queryFilters = generateFilter(filters)

    const query: {
      _start?: number
      _end?: number
      _sort?: string
      _order?: string
    } = {}

    if (mode === "server") {
      query._start = (current - 1) * pageSize
      query._end = current * pageSize
    }

    const generatedSort = generateSort(sorters)
    if (generatedSort) {
      const { _sort, _order } = generatedSort
      query._sort = _sort.join(",")
      query._order = _order.join(",")
    }

    const { data, headers } = await httpClient.get(
      `${url}?${stringify.stringify(query)}&${stringify.stringify(
        queryFilters
      )}`,
      { withCredentials: true, headers: { Cookie: cookies } }
    )

    let sessionId = null
    const setCookieValue = headers["set-cookie"]
    if (setCookieValue) {
      const firstValues = setCookieValue[0].split(";")[0]
      if (firstValues.includes("session-id")) {
        sessionId = firstValues.split("=")[1]
        const response = await axiosInstance.post("/auth/session", {
          sessionId: sessionId,
        })
      }
    }

    const total = Number.parseInt(`${headers["x-total-count"] ?? "0"}`)

    return {
      data,
      total: total || data.length,
      sessionId: sessionId,
    }
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify.stringify({ id: ids })}`,
      { withCredentials: true, headers: { Cookie: cookies } }
    )

    return {
      data,
    }
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`

    const { data } = await httpClient.post(url, variables, {
      withCredentials: true,
      headers: { Cookie: cookies },
    })

    return {
      data,
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await httpClient.patch(url, variables, {
      withCredentials: true,
      headers: { Cookie: cookies },
    })

    return {
      data,
    }
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await httpClient.get(url, {
      withCredentials: true,
      headers: { Cookie: cookies },
    })

    return {
      data,
    }
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await httpClient.delete(url, {
      data: variables,
      withCredentials: true,
      headers: { Cookie: cookies },
    })

    return {
      data,
    }
  },

  getApiUrl: () => {
    return apiUrl
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`

    if (sorters) {
      const generatedSort = generateSort(sorters)
      if (generatedSort) {
        const { _sort, _order } = generatedSort
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        }
        requestUrl = `${requestUrl}&${stringify.stringify(sortQuery)}`
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters)
      requestUrl = `${requestUrl}&${stringify.stringify(filterQuery)}`
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify.stringify(query)}`
    }

    if (headers) {
      // @ts-ignore
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      }
    }

    let axiosResponse
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          withCredentials: true,
          headers: { Cookie: cookies },
        })
        break
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          withCredentials: true,
          headers: { Cookie: cookies },
        })
        break
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          withCredentials: true,
          headers: { Cookie: cookies },
        })
        break
    }
    const { headers: myHeaders } = axiosResponse
    let sessionId = null
    const setCookieValue = myHeaders["set-cookie"]
    if (setCookieValue) {
      const firstValues = setCookieValue[0].split(";")[0]
      if (firstValues.includes("session-id")) {
        sessionId = firstValues.split("=")[1]
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_FRONT_URL}/auth/session`,
          {
            sessionId: sessionId,
          }
        )
      }
    }

    const { data } = axiosResponse

    return Promise.resolve({ data, sessionId: sessionId })
  },
})
