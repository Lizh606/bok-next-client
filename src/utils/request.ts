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
  _cachedData?: unknown
}

class Request {
  private instance: AxiosInstance
  private tokenHandler: TokenHandler
  private retryHandler: RetryHandler
  private cacheHandler: CacheHandler
  private disableCache: boolean
  private disableToken: boolean

  constructor(
    config: AxiosRequestConfig,
    options?: {
      disableCache?: boolean
      disableToken?: boolean
    }
  ) {
    this.instance = axios.create(config)
    this.tokenHandler = new TokenHandler(this.instance)
    this.retryHandler = new RetryHandler(this.instance)
    this.cacheHandler = new CacheHandler(this.instance)
    this.disableCache = options?.disableCache ?? false
    this.disableToken = options?.disableToken ?? false

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config) => {
        const preConfig = config as CustomAxiosRequestConfig
        if (this.disableCache) {
          preConfig.cache = { enabled: false }
        }

        // 1. 处理缓存 (仅针对 GET 请求)
        if (preConfig.method?.toUpperCase() === "GET") {
          const cachedResult = await this.cacheHandler.getCachedData(config)
          const resultConfig = cachedResult as CustomAxiosRequestConfig
          if (resultConfig._cached) {
            console.log("🔄 命中缓存，返回模拟响应")
            config.adapter = async () => ({
              data: resultConfig._cachedData,
              status: 200,
              statusText: "OK",
              headers: {},
              config: config
            })
          }
        }

        // 2. 处理 token
        if (!this.disableToken) {
          config = await this.tokenHandler.addTokenToRequest(config)
        }
        return config
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
        // 2. 处理 token 过期
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
    return this.instance.request<unknown, T>({
      ...options,
      method: "GET"
    })
  }

  async post<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<unknown, T>({
      ...options,
      method: "POST"
    })
  }

  async put<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<unknown, T>({
      ...options,
      method: "PUT"
    })
  }

  async delete<T>(options: CustomAxiosRequestConfig): Promise<T> {
    return this.instance.request<unknown, T>({
      ...options,
      method: "DELETE"
    })
  }
}

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL
const cmsBaseURL = process.env.NEXT_PUBLIC_CMS_API_URL || apiBaseURL
const cmsApiToken = process.env.NEXT_PUBLIC_CMS_API_TOKEN

export const http = new Request({
  baseURL: apiBaseURL
})

export const cmsHttp = new Request(
  {
    baseURL: cmsBaseURL,
    headers: cmsApiToken
      ? {
          Authorization: `Bearer ${cmsApiToken}`
        }
      : undefined
  },
  {
    disableCache: true,
    disableToken: true
  }
)
