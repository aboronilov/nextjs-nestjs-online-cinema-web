import { API_URL } from "@/api/index"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import { getMovieUrl } from "@/config/url.config"
import { IMovie } from "@/shared/types/movie.types"
import { removeTrailingSlash } from "@/utils/string/clearText"
import { NextPage } from "next"

async function fetchTrendingMovies() {
  const url = `${removeTrailingSlash(API_URL)}${getMovieUrl("fresh")}`
  const res = await fetch(url, { cache: "force-cache" })
  const movies = (await res.json()) as IMovie[]

  return movies
}

const FreshPage: NextPage = async () => {
  const movies = await fetchTrendingMovies()

  return (
    <Catalog
      movies={movies || []}
      title="Fresh movies"
      description="New movies and series trending now in hign quality"
    />
  )
}

export default FreshPage
