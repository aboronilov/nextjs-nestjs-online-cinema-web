"use client"

import { FC } from "react"
import { IHome } from "./home.interface"
import Layout from "@/components/layout/Layout"
import Heading from "@/components/ui/heading/Heading"
import { toastr } from "react-redux-toastr"

const Home: FC<IHome> = () => {
  return (
    <Layout>
      <Heading
        title="Watch movies online"
        className="text-gray-300 mb-8 text-xl"
      />
    </Layout>
  )
}

export default Home
