import { CacheItem, CacheStrategy } from "./types"

export class MemoryCache implements CacheStrategy {
  private cache: Map<string, CacheItem> = new Map()

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    return (this.cache.get(key) as CacheItem<T>) || null
  }

  async set<T>(key: string, value: CacheItem<T>): Promise<void> {
    this.cache.set(key, value)
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async clear(): Promise<void> {
    this.cache.clear()
  }

  async getAll(): Promise<Record<string, CacheItem<any>>> {
    return Object.fromEntries(this.cache)
  }
}
