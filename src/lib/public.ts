import { http } from "@/utils/request"
let token = ""

export const clearToken = () => {
  token = ""
}

export const getToken = async () => {
  if (token) return token
  try {
    const { access_token } = await http.post<any>({
      url: "auth/signIn",
      data: {
        username: "wanyue",
        password: "123456"
      }
    })
    token = access_token
    return access_token
  } catch (error) {
    console.error("获取 token 失败，跳过鉴权请求:", error)
    return ""
  }
}
