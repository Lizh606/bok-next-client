import { CacheItem, CacheStrategy } from "./types"

export class PersistentCache implements CacheStrategy {
  private prefix = "http-cache-"

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    try {
      const item = localStorage.getItem(this.prefix + key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  }

  async set<T>(key: string, value: CacheItem<T>): Promise<void> {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value))
    } catch {
      // 存储空间不足时清理旧缓存
      await this.clearExpired()
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value))
      } catch {
        // 如果还是失败，清除所有缓存
        await this.clear()
      }
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(this.prefix + key)
  }

  async clear(): Promise<void> {
    const keys = Object.keys(localStorage)
    keys
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => localStorage.removeItem(key))
  }

  private async clearExpired(
    maxAge: number = 24 * 60 * 60 * 1000
  ): Promise<void> {
    const keys = Object.keys(localStorage)
    const now = Date.now()

    keys
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => {
        try {
          const item = JSON.parse(localStorage.getItem(key) || "{}")
          if (now - item.timestamp > maxAge) {
            localStorage.removeItem(key)
          }
        } catch {
          localStorage.removeItem(key)
        }
      })
  }

  async getAll(): Promise<Record<string, CacheItem<any>>> {
    const keys = Object.keys(localStorage)
    return keys.reduce(
      (acc, key) => {
        if (key.startsWith(this.prefix)) {
          const item = JSON.parse(localStorage.getItem(key) || "{}")
          acc[key.slice(this.prefix.length)] = item
        }
        return acc
      },
      {} as Record<string, CacheItem<any>>
    )
  }
}
