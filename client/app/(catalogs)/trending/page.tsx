import { API_URL } from "@/api/index"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import { getMovieUrl } from "@/config/url.config"
import { IMovie } from "@/shared/types/movie.types"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { removeTrailingSlash } from "@/utils/string/clearText"
import { NextPage } from "next"

async function fetchTrendingMovies() {
  const url = `${removeTrailingSlash(API_URL)}${getMovieUrl("most-popular")}`
  const res = await fetch(url, { cache: "force-cache" })
  const movies = (await res.json()) as IMovie[]
  const randomMovies = getRandomItems(movies, 9)

  return randomMovies
}

const TrendingPage: NextPage = async () => {
  const randomMovies = await fetchTrendingMovies()

  return (
    <Catalog
      movies={randomMovies || []}
      title="Trending movies"
      description="The most popular and watched movies and series right now"
    />
  )
}

export default TrendingPage
