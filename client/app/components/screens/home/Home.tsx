"use client"

import Gallery from "@/components/ui/gallery/Gallery"
import { IHome } from "./home.interface"
import Layout from "@/components/layout/Layout"
import Heading from "@/components/ui/heading/Heading"
import SubHeading from "@/components/ui/heading/Subheading"
import Slider from "@/components/ui/slider/Slider"

export default function Home({ slides, actors, trendingMovies }: IHome) {
  return (
    <Layout>
      <Heading
        title="Watch movies online"
        className="text-gray-300 mb-8 text-xl"
      />
      {slides.length && <Slider slides={slides} />}

      <div className="my-10">
        <SubHeading title="Trending now" />
        {trendingMovies.length && <Gallery items={trendingMovies} />}
      </div>

      <div className="">
        <SubHeading title="Popular actors" />
        {trendingMovies.length && <Gallery items={actors} />}
      </div>
    </Layout>
  )
}
