import { http } from "@/utils/request"
let token = ""

export const clearToken = () => {
  token = ""
}

interface AuthTokenResponse {
  access_token: string
}

export const getToken = async (): Promise<string> => {
  if (token) return token
  try {
    const response = await http.post<AuthTokenResponse>({
      url: "auth/signIn",
      data: {
        username: "wanyue",
        password: "123456"
      }
    })
    token = response.access_token
    return token
  } catch (error) {
    console.error("获取 token 失败，跳过鉴权请求:", error)
    return ""
  }
}
