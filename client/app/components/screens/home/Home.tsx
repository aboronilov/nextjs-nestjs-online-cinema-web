"use client"

import { IHome } from "./home.interface"
import Layout from "@/components/layout/Layout"
import Heading from "@/components/ui/heading/Heading"
import Slider from "@/components/ui/slider/Slider"

export default function Home({ slides }: IHome) {
  return (
    <Layout>
      <Heading
        title="Watch movies online"
        className="text-gray-300 mb-8 text-xl"
      />
      {slides.length && <Slider slides={slides} />}
    </Layout>
  )
}
