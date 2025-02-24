import { CacheHandler } from "@/utils/cache/cacheHandler"
import type { CacheConfig } from "@/utils/cache/types"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { RetryHandler, type RetryConfig } from "./retryHandler"
import { TokenHandler } from "./tokenHandler"

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
  _retryCount?: number
  retryConfig?: RetryConfig
  cache?: CacheConfig
  _cached?: boolean
  _cachedData?: any
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
      async (config) => {
        // 1. 处理缓存
        const result = await this.cacheHandler.getCachedData(config)
        const customConfig = result as CustomAxiosRequestConfig

        // 如果有缓存数据，使用 CancelToken 取消请求并返回缓存数据
        if (customConfig._cached) {
          console.log("🔄 拦截缓存数据")
          const source = axios.CancelToken.source()
          config.cancelToken = source.token
          source.cancel(
            JSON.stringify({
              data: customConfig._cachedData,
              useCache: true
            })
          )
        }
        // 2. 处理token
        config = await this.tokenHandler.addTokenToRequest(config)
        return config
      },
      (error) => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        // 1. 处理缓存
        console.log("💾 设置缓存")
        response = await this.cacheHandler.setCachedData(response)
        return response.data
      },
      async (error) => {
        if (axios.isCancel(error)) {
          // 如果是因为缓存而取消的请求
          const response = JSON.parse(error.message as any)
          console.log("🔄 使用缓存数据")
          if (response.useCache) {
            return response.data
          }
        }
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
    return this.instance.request<any, T>({
      ...options,
      method: "GET"
    })
  }

  async post<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>({
      ...options,
      method: "POST"
    })
  }

  async put<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>({
      ...options,
      method: "PUT"
    })
  }

  async delete<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>({
      ...options,
      method: "DELETE"
    })
  }
}

export const http = new Request({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})
