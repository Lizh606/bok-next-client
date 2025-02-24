import type { CustomAxiosRequestConfig } from "@/utils/request"
import type { AxiosError, AxiosInstance } from "axios"

export interface RetryConfig {
  retries: number
  retryDelay: number
  retryableStatus?: number[]
  retryCondition?: (error: AxiosError) => boolean
  retryDelayFn?: (retryCount: number, delay: number) => number
}
const defaultRetryConfig: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryableStatus: [408, 429, 500, 502, 503, 504],
  retryDelayFn: (retryCount, delay) => delay * Math.pow(2, retryCount)
}

export class RetryHandler {
  constructor(private instance: AxiosInstance) {}

  async handleRetry(error: AxiosError) {
    const config = error.config as CustomAxiosRequestConfig
    if (!config) {
      return Promise.reject(error)
    }

    // 初始化重试配置
    if (!config.retryConfig) {
      config.retryConfig = defaultRetryConfig
    }

    // 初始化重试计数
    config._retryCount = (config._retryCount || 0) + 1

    if (this.shouldRetry(error)) {
      const delay = config.retryConfig.retryDelayFn
        ? config.retryConfig.retryDelayFn(
            config._retryCount,
            config.retryConfig.retryDelay
          )
        : config.retryConfig.retryDelay

      await this.wait(delay)
      return this.instance(config)
    }

    return Promise.reject(error)
  }

  private shouldRetry(error: AxiosError): boolean {
    const config = error.config as CustomAxiosRequestConfig
    if (!config || !config.retryConfig) {
      return false
    }

    if (
      config._retryCount &&
      config._retryCount >= config.retryConfig.retries
    ) {
      return false
    }

    if (
      config.retryConfig.retryableStatus?.includes(error.response?.status || 0)
    ) {
      return true
    }

    if (config.retryConfig.retryCondition) {
      return config.retryConfig.retryCondition(error)
    }

    return false
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
