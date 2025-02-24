export interface CacheConfig {
  enabled?: boolean
  ttl?: number
  key?: string
  persistent?: boolean
  revalidate?: number
  tags?: string[]
}

export interface CacheItem<T = any> {
  data: T
  timestamp: number
}

export interface CacheStrategy {
  get<T>(key: string): Promise<CacheItem<T> | null>
  set<T>(key: string, value: CacheItem<T>): Promise<void>
  delete(key: string): Promise<void>
  getAll(): Promise<Record<string, CacheItem<any>>>
}
