import { http } from "@/utils/request"
let token = ""

export const getToken = async () => {
  if (token) return token
  const { access_token } = await http.post<any>({
    url: "auth/signIn",
    data: {
      username: "wanyue",
      password: "123456"
    }
  })

  token = access_token
  return access_token
}
