import PersonScreen from "@/ui/home/person-screen"
import PostScreen from "@/ui/home/post-screen"

const GrowthScreen = () => {
  return <div className="h-screen flex relative">container:站点成长</div>
}
// const PersonScreen = dynamic(() => import("@/ui/home/person-screen"))
// const PostScreen = dynamic(() => import("@/ui/home/post-screen"), {
//   loading: () => <p>...</p>,
//   ssr: false
// })
export default function Home() {
  return (
    <>
      <PersonScreen></PersonScreen>
      <PostScreen></PostScreen>
      {/* <GrowthScreen></GrowthScreen> */}
    </>
  )
}
