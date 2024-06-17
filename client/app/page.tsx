import Home from "@/components/screens/home/Home"
import { ISlide } from "./components/ui/slider/slider.interface"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { getMovieUrl } from "@/config/url.config"
import { getGenresList } from "@/utils/movie/getGenresListEach"
import { IMovie } from "@/shared/types/movie.types"
import { API_URL } from "@/api/index"
import { removeTrailingSlash } from "@/utils/string/clearText"

async function fetchMovies() {
  const url = `${removeTrailingSlash(API_URL)}${getMovieUrl("")}`
  const res = await fetch(url, { cache: "force-cache" })
  const movies = await res.json()
  const randomMovies = getRandomItems(movies, 10) as IMovie[]

  const slides: ISlide[] = randomMovies.map((item) => ({
    _id: item._id,
    link: getMovieUrl(item.slug),
    bigPoster: item.bigPoster,
    subTitle: getGenresList(item.genres),
    title: item.title,
  }))

  return slides
}

export default async function Page() {
  const slides = await fetchMovies()

  return <Home slides={slides} />
}
