import { FC } from "react"
import { IHome } from "./home.interface"
import Layout from "@/components/layout/Layout"
import Heading from "@/components/ui/heading/Heading"

const Home: FC<IHome> = () => {
  return (
    <Layout>
      <Heading title="Watch movies online" className="text-gray-300 mb-8 text-xl"/>
      <h1>Home page</h1>
    </Layout>
  )
}

export default Home
