// 先创建一个类，给类添加1个属性 instance代表axios的实例  构造函数传递配置 config配置比如全局的baseURL timeout
import { getToken } from "@/lib/public"
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"
// interface Result<T = any> {
//   data: T;
//   success: boolean;
// }
class Request {
  // 限制创建的实例必须是axios的实例
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 接下来配置axios实例身上的全局配置，比如拦截器
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (config.url?.includes("auth")) return config
        const token = await getToken()
        config.headers["Authorization"] = "Bearer " + token
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
  // 公共方法，因为不知道返回值的类型
  fetchData<T>(options: AxiosRequestConfig): Promise<T> {
    // 将私有的instance上面发请求的操作，封装到这个实例方法request中，这个方法的返回值应该是一个promise对象
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
  // 调用上面封装的实例方法request，来实现get / post / delete / put 方法的快捷调用
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
