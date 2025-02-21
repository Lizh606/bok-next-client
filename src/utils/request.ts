import { clearToken, getToken } from "@/lib/public"
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"
class Request {
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // 默认用户鉴权
        if (config.url?.includes("auth")) return config
        const token = await getToken()
        config.headers["Authorization"] = "Bearer " + token
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error: AxiosError) => {
        // 处理401未授权错误
        if (error.response?.status === 401) {
          clearToken()
        }
        return Promise.reject(error)
      }
    )
  }
  // 公共方法
  fetchData<T>(options: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(options)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData<T>({ ...options, method: "GET" })
  }
  post<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData({ ...options, method: "POST" })
  }
  put<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData({ ...options, method: "PUT" })
  }
  delete<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData({ ...options, method: "DELETE" })
  }
}

export const http = new Request({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})
