import { http } from "@/utils/request"
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbmdoYW5nIiwic3ViIjozNiwiaWF0IjoxNzEwODMyMDY1LCJleHAiOjE3MTA5MTg0NjV9.3K0lXpvH264ZKwc6Df8bwgXeBa8OKvHAsrIrSmsbLkA"
type Data = {
  id: number
  name: string
  path: string
  order: number
  acl: string
}
export const getList = async () => {
  const data = await http.get<Data[]>({
    url: "menus",
    headers: { Authorization: "Bearer " + token }
  })
  return data
}
