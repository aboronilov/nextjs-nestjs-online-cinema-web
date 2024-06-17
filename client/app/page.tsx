import Home from "@/components/screens/home/Home"
import { ISlide } from "./components/ui/slider/slider.interface"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { getActorUrl, getMovieUrl } from "@/config/url.config"
import { getGenresList } from "@/utils/movie/getGenresListEach"
import { IActor, IMovie } from "@/shared/types/movie.types"
import { API_URL } from "@/api/index"
import { removeTrailingSlash } from "@/utils/string/clearText"
import { IGalleryItem } from "./components/ui/gallery/gallery.interface"

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

async function fetchTrendingMovies() {
  const url = `${removeTrailingSlash(API_URL)}${getMovieUrl("")}`
  const res = await fetch(url, { cache: "force-cache" })
  const movies = (await res.json()) as IMovie[]
  const randomMovies = getRandomItems(movies, 10) as IMovie[]

  const trendingMovies: IGalleryItem[] = randomMovies.map((item) => ({
    name: item.title,
    posterPath: `/uploads/movies/${item.slug}/poster.webp`,
    link: getMovieUrl(item.slug),
  }))

  return trendingMovies
}

async function fetchActors() {
  const url = `${removeTrailingSlash(API_URL)}${getActorUrl("")}`
  const res = await fetch(url, { cache: "force-cache" })
  const actorsJson = await res.json()
  const randomActors = getRandomItems(actorsJson, 10) as IActor[]

  const actors: IGalleryItem[] = randomActors.map((item) => ({
    name: item.name,
    posterPath: `/uploads/actors/${item.slug}.webp`,
    link: getMovieUrl(item.slug),
    content: {
      title: item.name,
      subTitle: `+ ${item.countMovies} movies`,
    },
  }))

  return actors
}

export default async function Page() {
  const slides = await fetchMovies()
  const trandingMovies = await fetchTrendingMovies()
  const actors = await fetchActors()

  return (
    <Home slides={slides} trendingMovies={trandingMovies} actors={actors} />
  )
}
