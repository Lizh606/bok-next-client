import type { CustomAxiosRequestConfig } from "@/utils/request"
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import { MemoryCache } from "./memoryCache"
import { PersistentCache } from "./persistentCache"
import { ServerCache } from "./serverCache"
import { CacheConfig, CacheItem, CacheStrategy } from "./types"

// 默认的客户端缓存配置
const defaultClientCacheConfig: CacheConfig = {
  enabled: true,
  ttl: 5 * 60 * 1000, // 5分钟
  persistent: true
}

// 默认的服务端缓存配置
const defaultServerCacheConfig: CacheConfig = {
  enabled: true,
  revalidate: 5 * 60 * 1000, // 5分钟
  tags: ["api-cache"]
}

export class CacheHandler {
  private strategies: Map<string, CacheStrategy> = new Map()
  private isClient: boolean
  private cleanupInterval?: NodeJS.Timeout

  constructor(private instance?: AxiosInstance) {
    this.isClient = typeof window !== "undefined"
    // 只在客户端初始化 memory 和 persistent 缓存
    if (this.isClient) {
      this.strategies.set("memory", new MemoryCache())
      this.strategies.set("persistent", new PersistentCache())
    }

    // 服务端缓存总是可用
    this.strategies.set("server", new ServerCache())
    // 每分钟执行一次
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 60 * 1000)
  }

  // 添加析构方法
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
  }

  // 添加清理方法
  private async cleanup(): Promise<void> {
    if (this.isClient) {
      // 清理客户端缓存
      const memoryStrategy = this.strategies.get("memory")
      const persistentStrategy = this.strategies.get("persistent")

      if (memoryStrategy) {
        const allMemoryCache = await memoryStrategy.getAll()
        for (const [key, item] of Object.entries(allMemoryCache)) {
          if (
            !this.isCacheValid(
              item.timestamp,
              defaultClientCacheConfig.ttl || 300000
            )
          ) {
            await memoryStrategy.delete(key)
            console.log("🗑️ 清理过期内存缓存:", key)
          }
        }
      }

      if (persistentStrategy) {
        const allPersistentCache = await persistentStrategy.getAll()
        for (const [key, item] of Object.entries(allPersistentCache)) {
          if (
            !this.isCacheValid(
              item.timestamp,
              defaultClientCacheConfig.ttl || 300000
            )
          ) {
            await persistentStrategy.delete(key)
            console.log("🗑️ 清理过期持久化缓存:", key)
          }
        }
      }
    } else {
      // 清理服务端缓存
      const serverStrategy = this.strategies.get("server")
      if (serverStrategy) {
        const allServerCache = await serverStrategy.getAll()
        for (const [key, item] of Object.entries(allServerCache)) {
          if (
            !this.isCacheValid(
              item.timestamp,
              defaultServerCacheConfig.revalidate || 300000
            )
          ) {
            await serverStrategy.delete(key)
            console.log("🗑️ 清理过期服务端缓存:", key)
          }
        }
      }
    }
  }

  private getCacheConfig(config: CustomAxiosRequestConfig): CacheConfig {
    const defaultConfig = this.isClient
      ? defaultClientCacheConfig
      : defaultServerCacheConfig
    return {
      ...defaultConfig,
      ...config.cache,
      key: config.cache?.key || `${config.url}-${JSON.stringify(config.params)}`
    }
  }
  async getCachedData(config: InternalAxiosRequestConfig) {
    const customConfig = config as CustomAxiosRequestConfig
    if (customConfig.method?.toUpperCase() === "GET" && customConfig.url) {
      const cacheConfig = this.getCacheConfig(customConfig)
      const cached = await this.get(cacheConfig.key || "", cacheConfig)

      if (cached) {
        // 在配置中标记缓存数据
        return {
          ...config,
          _cached: true,
          _cachedData: cached
        } as InternalAxiosRequestConfig
      }
    }
    return config
  }
  async setCachedData(response: AxiosResponse): Promise<AxiosResponse> {
    const config = response.config as CustomAxiosRequestConfig
    if (config.method?.toUpperCase() === "GET" && config.url) {
      const cacheConfig = this.getCacheConfig(config)
      await this.set(cacheConfig.key || "", response.data, cacheConfig)
    }
    return response
  }

  async get<T>(key: string, config: CacheConfig): Promise<T | null> {
    if (!config.enabled) return null

    if (this.isClient) {
      // 检查内存缓存
      const memoryCache = await this.strategies.get("memory")?.get<T>(key)
      if (
        memoryCache &&
        this.isCacheValid(memoryCache.timestamp, config.ttl || 300000)
      ) {
        console.log("✅ 命中内存缓存:", key)
        return memoryCache.data
      }

      // 检查持久化缓存
      if (config.persistent) {
        const persistentCache = await this.strategies
          .get("persistent")
          ?.get<T>(key)
        if (
          persistentCache &&
          this.isCacheValid(persistentCache.timestamp, config.ttl || 300000)
        ) {
          console.log("✅ 命中持久化缓存:", key)
          // 同步到内存缓存
          await this.strategies.get("memory")?.set(key, persistentCache)
          return persistentCache.data
        }
      }
      console.log("❌ 未命中缓存:", key)
    } else {
      // 服务端缓存
      const serverCache = await this.strategies.get("server")?.get<T>(key)
      if (serverCache) {
        console.log("✅ 命中服务端缓存:", key)
        return serverCache.data
      }
    }

    return null
  }

  async set<T>(key: string, value: T, config: CacheConfig): Promise<void> {
    if (!config.enabled) return

    const cacheItem: CacheItem<T> = {
      data: value,
      timestamp: Date.now()
    }

    if (this.isClient) {
      // 设置内存缓存
      await this.strategies.get("memory")?.set(key, cacheItem)
      console.log("💾 已存入内存缓存:", key)

      // 设置持久化缓存
      if (config.persistent) {
        await this.strategies.get("persistent")?.set(key, cacheItem)
        console.log("💾 已存入持久化缓存:", key)
      }
    } else {
      // 设置服务端缓存
      await this.strategies.get("server")?.set(key, cacheItem)
      console.log("💾 已存入服务端缓存:", key)
    }
  }

  private isCacheValid(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp < ttl
  }
}
