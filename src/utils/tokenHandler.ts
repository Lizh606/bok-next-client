import { clearToken, getToken } from "@/lib/public"
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from "axios"
import type { CustomAxiosRequestConfig } from "./request"

export class TokenHandler {
  private isRefreshing = false
  private requests: Array<(token: string) => void> = []

  constructor(private instance: AxiosInstance) {}

  // 处理token刷新
  async handleTokenRefresh(error: AxiosError) {
    const config = error.config as InternalAxiosRequestConfig &
      CustomAxiosRequestConfig

    if (!config) return Promise.reject(error)

    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.requests.push((token: string) => {
          if (config.headers) {
            config.headers["Authorization"] = "Bearer " + token
          }
          resolve(this.instance(config))
        })
      })
    }

    config._retry = true
    this.isRefreshing = true

    try {
      clearToken()
      const newToken = await getToken()

      // 重试队列中的请求
      this.requests.forEach((cb) => cb(newToken))
      this.requests = []

      // 重试当前请求
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + newToken
      }
      return this.instance(config)
    } catch (refreshError) {
      clearToken()
      return Promise.reject(refreshError)
    } finally {
      this.isRefreshing = false
    }
  }

  // 添加token到请求头
  async addTokenToRequest(
    config: InternalAxiosRequestConfig & CustomAxiosRequestConfig
  ) {
    if (config.url?.includes("auth")) return config
    const token = await getToken()
    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  }
}
