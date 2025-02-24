import { revalidateTag, unstable_cache } from "next/cache"
import { CacheItem, CacheStrategy } from "./types"

export class ServerCache implements CacheStrategy {
  private cache: Map<string, CacheItem> = new Map()

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
    // 使对应的 tag 失效
    try {
      revalidateTag(`http-cache-${key}`)
      console.log("✅ 服务端缓存删除成功:", key)
    } catch (error) {
      console.error("❌ 服务端缓存删除失败:", {
        key,
        error
      })
    }
  }

  async clear(): Promise<void> {
    this.cache.clear()
    // 使所有 api-cache 标签的缓存失效
    try {
      revalidateTag("api-cache")
      console.log("✅ 服务端缓存清理成功")
    } catch (error) {
      console.error("❌ 服务端缓存清理失败:", error)
    }
  }

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    const cached = this.cache.get(key) as CacheItem<T> | undefined

    return cached || null
  }

  async set<T>(
    key: string,
    value: CacheItem<T>,
    revalidate: number = 3600,
    tags: string[] = []
  ): Promise<void> {
    console.log("📝 服务端缓存设置开始:", {
      key,
      revalidate,
      tags
    })

    this.cache.set(key, value)

    try {
      await unstable_cache(async () => value, [`http-cache-${key}`], {
        revalidate,
        tags
      })()
      console.log("✅ 服务端缓存设置成功:", {
        key,
        cacheSize: this.cache.size,
        allKeys: Array.from(this.cache.keys())
      })
    } catch (error) {
      console.error("❌ 服务端缓存设置失败:", {
        key,
        error
      })
    }
  }

  async getAll(): Promise<Record<string, CacheItem<any>>> {
    return Object.fromEntries(this.cache)
  }
}
