export interface CacheConfig {
  enabled?: boolean
  ttl?: number
  key?: string
  persistent?: boolean
  revalidate?: number
  tags?: string[]
}

export interface CacheItem<T = unknown> {
  data: T
  timestamp: number
  expires?: number
}

export interface CacheStrategy {
  get<T>(key: string): Promise<CacheItem<T> | null>
  set<T>(key: string, item: CacheItem<T>): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
  getAll(): Promise<Record<string, CacheItem<unknown>>>
}
