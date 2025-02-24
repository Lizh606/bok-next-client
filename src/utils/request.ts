import { clearToken, getToken } from "@/lib/public"
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
  _retryCount?: number
  retryConfig?: RetryConfig
}

interface RetryConfig {
  // 最大重试次数
  retries: number
  // 重试延迟（毫秒）
  retryDelay: number
  // 哪些状态码需要重试
  retryableStatus?: number[]
  // 自定义重试条件
  retryCondition?: (error: AxiosError) => boolean
  // 延迟计算函数（可选，用于实现指数退避）
  retryDelayFn?: (retryCount: number, delay: number) => number
}

// 默认配置
const defaultRetryConfig: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryableStatus: [408, 429, 500, 502, 503, 504],
  retryDelayFn: (retryCount, delay) => delay * Math.pow(2, retryCount) // 指数退避
}

class Request {
  private instance: AxiosInstance
  private isRefreshing = false // 是否正在刷新token
  private requests: Array<(token: string) => void> = [] // 存储等待重试的请求
  private defaultRetryConfig: RetryConfig

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.defaultRetryConfig = defaultRetryConfig

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
      async (error: AxiosError) => {
        const config = error.config as CustomAxiosRequestConfig

        // 处理401刷新token的逻辑
        if (error.response?.status === 401) {
          if (this.isRefreshing) {
            // 等待其他请求刷新token
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
            // 直接使用 getToken 获取新token
            const newToken = await getToken()

            // 重试所有请求
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

        // 处理其他错误的重试逻辑
        if (this.shouldRetry(error)) {
          config._retryCount = (config._retryCount || 0) + 1
          const retryConfig = config.retryConfig || this.defaultRetryConfig

          // 计算延迟时间
          const delay = retryConfig.retryDelayFn
            ? retryConfig.retryDelayFn(
                config._retryCount,
                retryConfig.retryDelay
              )
            : retryConfig.retryDelay

          // 等待后重试
          await this.wait(delay)
          return this.instance(config)
        }

        return Promise.reject(error)
      }
    )
  }

  // 判断是否应该重试
  private shouldRetry(error: AxiosError): boolean {
    const config = error.config as CustomAxiosRequestConfig
    const retryConfig = config.retryConfig || this.defaultRetryConfig

    // 检查重试次数
    if (!config._retryCount || config._retryCount >= retryConfig.retries) {
      return false
    }

    // 检查状态码
    if (retryConfig.retryableStatus?.includes(error.response?.status || 0)) {
      return true
    }

    // 检查自定义条件
    if (retryConfig.retryCondition) {
      return retryConfig.retryCondition(error)
    }

    return false
  }

  // 延迟函数
  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
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
