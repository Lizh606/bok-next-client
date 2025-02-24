**Axios 缓存机制文档**

本缓存机制为 **`Axios`** 请求提供了一个高度可扩展和灵活的缓存层，分为客户端和服务端两部分，实现了内存缓存、持久化缓存与服务端缓存的结合。以下是对整体流程的详细介绍，分为客户端和服务端的缓存管理。

### 1. **缓存策略概述**

所有缓存策略都实现了统一的 **`CacheStrategy`** 接口，包含以下方法：

- **`get<T>(key: string): Promise<CacheItem<T> | null>`**
- **`set<T>(key: string, value: CacheItem<T>): Promise<void>`**
- **`delete(key: string): Promise<void>`**
- **`clear(): Promise<void>`**
- **`getAll(): Promise<Record<string, CacheItem<any>>>`**

缓存类型包括：

- **内存缓存（MemoryCache）**：基于 **`Map`** 实现的内存存储
- **持久化缓存（PersistentCache）**：基于 **`localStorage`** 实现的本地存储
- **服务端缓存（ServerCache）**：基于 Next.js 的 **`unstable_cache`** 实现的服务端存储

### 2. **缓存配置**

#### 客户端缓存配置

```ts
const defaultClientCacheConfig = {
  enabled: true,
  ttl: 5 * 60 * 1000, // 5分钟
  persistent: true
}
```

#### 服务端缓存配置

```ts
const defaultServerCacheConfig = {
  enabled: true,
  revalidate: 5 * 60 * 1000, // 5分钟
  tags: ["api-cache"]
}
```

### 3. **使用方式**

#### 基本用法

```ts
// 在请求配置中添加缓存选项
const response = await http.get({
  url: "/api/data",
  cache: {
    enabled: true,
    ttl: 300000,
    persistent: true
  }
})
```

#### 缓存键生成

缓存键默认基于请求 URL 和参数自动生成：

```ts
const cacheKey = `${config.url}-${JSON.stringify(config.params)}`
```

也可以在请求配置中指定自定义的缓存键：

```ts
const response = await http.get({
  url: "/api/data",
  cache: {
    key: "custom-cache-key"
  }
})
```

### 4. **缓存处理流程**

#### 1. 请求拦截

```ts
// 检查是否存在有效缓存
const result = await cacheHandler.getCachedData(config)

if (result._cached) {
  // 如果有缓存，取消请求并返回缓存数据
  return result._cachedData
}
```

#### 2. 响应拦截

```ts
// 存储响应数据到缓存
response = await cacheHandler.setCachedData(response)
```

### 5. **缓存清理机制**

#### 自动清理

- 系统每分钟自动检查并清理过期缓存
- 清理同时作用于内存缓存、持久化缓存和服务端缓存

#### 存储空间管理（持久化缓存）

当存储空间不足时：

1. 首先清理过期缓存（默认24小时）
2. 如果仍然不足，则清理所有缓存

#### 手动清理

```ts
// 清理特定缓存
await cacheHandler.delete(key)

// 清理所有缓存
await cacheHandler.clear()
```

### 6. **服务端缓存特性**

- 使用 Next.js 的 **`unstable_cache`** 和 **`revalidateTag`** 实现
- 支持缓存标签（tags）系统
- 可配置重新验证时间（revalidate）
- 缓存标签格式：`http-cache-${key}`

### 7. **调试信息**

系统会输出详细的缓存操作日志：

- ✅ 缓存命中信息
- 💾 缓存存储信息
- 🗑️ 缓存清理信息
- ❌ 缓存操作失败信息

### 8. **注意事项**

1. 只有 `GET` 请求会被缓存
2. 客户端缓存（内存和持久化）仅在浏览器环境中可用
3. 服务端缓存在所有环境中都可用
4. 缓存配置可以在请求级别进行覆盖
5. 建议为重要的缓存数据设置自定义的缓存键

### 9. **类型定义**

```ts
interface CacheConfig {
  enabled?: boolean
  ttl?: number
  persistent?: boolean
  key?: string
  revalidate?: number
  tags?: string[]
}

interface CacheItem<T = any> {
  data: T
  timestamp: number
}
```

### 10. **客户端缓存流程**

客户端缓存分为内存缓存（MemoryCache）和持久化缓存（PersistentCache）两种实现，它们都遵循相同的 CacheStrategy 接口。

#### 内存缓存（MemoryCache）

- 使用 JavaScript `Map` 数据结构在内存中存储数据
- 页面刷新后数据会丢失
- 实现简单，访问速度最快
- 适用于临时数据的快速存取

示例：

```ts
const memoryCache = new MemoryCache()

await memoryCache.set("key", { data: value, timestamp: Date.now() })

const data = await memoryCache.get("key")
```

#### 持久化缓存（PersistentCache）

- 基于 `localStorage` 实现持久化存储
- 所有缓存项都带有 `"http-cache-"` 前缀
- 包含自动清理机制，防止存储空间溢出：
  1. 当存储空间不足时，首先清理过期缓存（默认 24 小时）
  2. 如果仍然无法存储，则清理所有缓存
- 数据会持久保存，页面刷新后仍然可用

示例：

```ts
const persistentCache = new PersistentCache()

await persistentCache.set("key", { data: value, timestamp: Date.now() })

const data = await persistentCache.get("key")
```

#### 共同特性

两种缓存实现都支持以下操作：

- **`get<T>(key)`**: 获取缓存数据
- **`set<T>(key, value)`**: 设置缓存数据
- **`delete(key)`**: 删除指定缓存
- **`clear()`**: 清空所有缓存
- **`getAll()`**: 获取所有缓存数据

#### 缓存清理机制

- **内存缓存**：通过 `clear()` 方法直接清空 `Map`
- 持久化缓存：
  - **`clearExpired()`**: 清理过期缓存（默认 24 小时）
  - **`clear()`**: 清理所有以 `"http-cache-"` 为前缀的缓存项
  - 存储空间不足时的自动清理策略

#### 初始化和缓存策略

- 客户端会自动初始化内存缓存和持久化缓存，并使用一个 **`Map`** 管理这两种缓存策略。

- 内存缓存和持久化缓存的配置分别由

  `defaultClientCacheConfig`

  定义，其中：

  - **`ttl`**：定义缓存的过期时间，单位为毫秒（默认为 5 分钟）。
  - **`persistent`**：决定是否启用持久化缓存。

#### 请求缓存获取与存储

- **获取缓存**：
  - 通过 **`getCachedData`** 方法，判断当前请求是否符合缓存条件（如：`GET` 请求）。如果缓存可用且有效，则直接返回缓存数据。
  - 内存缓存和持久化缓存会按照优先级进行检查，优先返回内存缓存。如果内存缓存不存在，则会检查持久化缓存，并将持久化缓存同步到内存缓存中。
- **缓存存储**：
  - 通过 **`setCachedData`** 方法，处理成功的 `GET` 请求的响应数据，将其存入内存缓存及可选的持久化缓存中。
  - 缓存项会以 **`CacheItem`** 对象存储，包含数据和时间戳。

#### 缓存清理

为防止缓存占用过多资源，客户端会定时清理过期的缓存数据。**`cleanup`** 方法每分钟执行一次，检查内存缓存和持久化缓存中的数据是否超时，并删除过期数据。

#### 缓存失效

每个缓存项都会附带时间戳，缓存的有效性通过与当前时间进行对比来判断是否过期。缓存项过期后，会被自动清理。

### 11. **服务端缓存流程**

服务端缓存基于 Next.js 的缓存机制实现，使用 **`unstable_cache`** 和 **`revalidateTag`** 来管理缓存数据。缓存同时存储在内存中的 `Map` 结构和 Next.js 的缓存系统中。

#### 初始化和缓存策略

- 服务端缓存通过 **`ServerCache`** 类实现，使用 **`Map`** 结构在内存中维护缓存数据。
- 每个缓存项都会被赋予一个特定的标签（tag），格式为 **`http-cache-${key}`**。
- 默认的缓存重新验证时间为 3600 秒（1小时）。

#### 请求缓存获取与存储

- **获取缓存**：
  - 通过 **`get`** 方法从内存 `Map` 中获取缓存数据。
  - 如果缓存不存在，返回 `null`。
- **缓存存储**：
  - 使用 **`set`** 方法同时将数据存储在内存 `Map` 和 Next.js 缓存中。
  - 可以通过 **`revalidate`** 参数设置缓存的重新验证时间。
  - 支持为缓存项设置自定义标签（tags）。

#### 缓存清理

缓存清理有两种方式：

- **单个缓存项清理**：通过 **`delete`** 方法删除指定 `key` 的缓存，同时会使对应的 **`http-cache-${key}`** 标签失效。
- **全部缓存清理**：通过 **`clear`** 方法清空内存 `Map`，并使所有带有 **`api-cache`** 标签的缓存失效。

示例代码：

```ts
// 设置缓存
await serverCache.set("user-1", userData, 3600, ["users"])

// 获取缓存
const cachedUser = await serverCache.get("user-1")

// 删除指定缓存
await serverCache.delete("user-1")

// 清空所有缓存
await serverCache.clear()
```

### 12. **缓存配置与过期机制**

缓存的有效性通过 **`isCacheValid`** 方法进行验证，该方法比较缓存项的时间戳与当前时间，判断缓存是否已经过期。缓存的过期时间由 **`ttl`**（客户端）或 **`revalidate`**（服务端）控制，默认值均为 5 分钟。

### 13. **析构和清理**

**`CacheHandler`** 类提供了 **`destroy`** 方法用于清理缓存系统，清除定时器，释放资源。

### 14. **缓存键的生成**

缓存键的生成规则基于请求的 URL 和查询参数。在服务端缓存中，这些键还会被用来生成特定的缓存标签，格式为 **`http-cache-${key}`**。

---

### 总结

本缓存机制通过客户端和服务端缓存的合理配置与策略，实现了高效、可靠的数据缓存管理，支持快速数据访问、减少重复请求及提升应用性能。在客户端，数据可在内存缓存和持久化缓存之间切换；而在服务端，缓存可用于跨会话共享公共数据，优化系统性能。

### Q&A

### **1. 如何在 Axios 中实现缓存机制？**

**答：**
在 Axios 中实现缓存机制，通常是通过拦截器（interceptors）来处理请求和响应。具体步骤如下：

- **请求拦截器**：在请求发送之前检查是否有有效的缓存，如果有则直接返回缓存数据，避免再次请求。
- **响应拦截器**：在请求返回时，将响应数据存入缓存，以便后续请求使用。

例如，拦截器的实现可能是：

```ts
axios.interceptors.request.use((config) => {
  // 检查缓存
  const cachedData = cacheHandler.getCachedData(config)
  if (cachedData) {
    return Promise.resolve({ data: cachedData })
  }
  return config
})

axios.interceptors.response.use((response) => {
  // 存储缓存
  cacheHandler.setCachedData(response)
  return response
})
```

### **2. 你是如何处理缓存失效的？缓存过期后如何重新发起请求？**

**答：**
缓存失效通常通过设置 **TTL（Time To Live，存活时间）** 来实现。每次请求时都会检查缓存的有效性，如果缓存已经过期，缓存会被清除并重新发起请求。
可以通过以下方式判断缓存是否有效：

```ts
function isCacheValid(timestamp, ttl) {
  return Date.now() - timestamp < ttl
}
```

如果缓存失效，系统会重新请求数据并更新缓存。一般会通过定时清理缓存和重新发起请求的方式来确保数据的最新性。

### **3. 在 Axios 缓存机制中，如何管理多个缓存策略（如内存缓存、持久化缓存、服务端缓存）？**

**答：**
在实现缓存时，可以为不同的缓存类型选择不同的缓存策略，常见的有：

- **内存缓存**：使用浏览器的内存来存储缓存数据，适用于短期存储，可以通过 `Map` 或对象实现。
- **持久化缓存**：将缓存数据存储在本地存储（`localStorage`、`sessionStorage`）中，适用于需要在用户会话之间持久化的缓存。
- **服务端缓存**：将数据存储在服务器端缓存中，例如 Redis，适用于跨会话和跨用户的数据缓存。

你可以通过 `CacheHandler` 类来分别管理这些缓存策略，并选择合适的缓存类型：

```ts
const strategies = new Map()
strategies.set("memory", new MemoryCache())
strategies.set("persistent", new PersistentCache())
strategies.set("server", new ServerCache())
```

根据请求类型，动态选择合适的缓存策略。

### **4. 如何生成缓存键，并确保缓存键的唯一性？**

**答：**
缓存键用于唯一标识缓存数据，生成缓存键时通常会考虑请求的 URL 和查询参数。可以根据请求的 URL、方法、参数等信息来构造一个独特的缓存键。例如：

```ts
const generateCacheKey = (config) => {
  return `${config.url}-${JSON.stringify(config.params)}`
}
```

这种方式能够确保缓存键的唯一性，避免不同请求之间的缓存冲突。为了更好地管理缓存键，可以将其存储在内存、持久化存储或服务端缓存中。

### **5. 你是如何实现缓存清理的？如何定期清理过期的缓存数据？**

**答：**
缓存清理可以通过设置定时任务来定期检查并删除过期的缓存数据。一般来说，清理机制通过检查缓存项的时间戳与当前时间的差值，判断缓存是否过期。可以使用 `setInterval` 来每隔一段时间执行清理操作：

```ts
setInterval(() => {
  cleanup()
}, 60 * 1000) // 每分钟清理一次
```

在 `cleanup` 方法中，会遍历所有缓存数据，判断缓存是否过期，过期的缓存会被删除：

```ts
async function cleanup() {
  const allCaches = await cacheHandler.getAllCaches()
  for (const [key, cache] of Object.entries(allCaches)) {
    if (!isCacheValid(cache.timestamp, cache.ttl)) {
      await cacheHandler.deleteCache(key)
      console.log(`清理过期缓存：${key}`)
    }
  }
}
```

这种方式保证了缓存不会无限制积累，避免内存或存储的浪费。
