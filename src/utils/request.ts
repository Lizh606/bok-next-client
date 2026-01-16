import { CacheHandler } from "@/utils/cache/cacheHandler"
import type { CacheConfig } from "@/utils/cache/types"
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"
import { RetryHandler, type RetryConfig } from "./retryHandler"
import { TokenHandler } from "./tokenHandler"

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
  _retryCount?: number
  retryConfig?: RetryConfig
  cache?: CacheConfig
  _cached?: boolean
  _cachedData?: unknown
}

class Request {
  private instance: AxiosInstance
  private tokenHandler: TokenHandler
  private retryHandler: RetryHandler
  private cacheHandler: CacheHandler

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.tokenHandler = new TokenHandler(this.instance)
    this.retryHandler = new RetryHandler(this.instance)
    this.cacheHandler = new CacheHandler(this.instance)

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const preConfig = config as InternalAxiosRequestConfig &
          CustomAxiosRequestConfig

        // 1. 处理缓存 (针对 GET)
        if (preConfig.method?.toUpperCase() === "GET") {
          const result = await this.cacheHandler.getCachedData(config)
          const customConfig = result as InternalAxiosRequestConfig &
            CustomAxiosRequestConfig

          if (customConfig._cached) {
            console.log("🔄 命中缓存，返回模拟响应")
            config.adapter = async () => ({
              data: customConfig._cachedData,
              status: 200,
              statusText: "OK",
              headers: {},
              config: config
            })
          }
        }

        // 2. 处理token
        return await this.tokenHandler.addTokenToRequest(
          config as InternalAxiosRequestConfig & CustomAxiosRequestConfig
        )
      },
      (error) => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        // 1. 处理缓存存储
        await this.cacheHandler.setCachedData(response)
        return response.data
      },
      async (error) => {
        // 2. 处理token过期
        if (error.response?.status === 401) {
          return this.tokenHandler.handleTokenRefresh(error)
        }

        // 3. 处理重试
        return this.retryHandler.handleRetry(error)
      }
    )
  }

  // 请求方法
  async get<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<T, T>({
      ...options,
      method: "GET"
    })
  }

  async post<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<T, T>({
      ...options,
      method: "POST"
    })
  }

  async put<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<T, T>({
      ...options,
      method: "PUT"
    })
  }

  async delete<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<T, T>({
      ...options,
      method: "DELETE"
    })
  }
}

export const http = new Request({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})
