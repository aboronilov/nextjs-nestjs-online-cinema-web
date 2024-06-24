"use client"

import SingleMovie from "@/components/screens/single-movie/SingleMovie"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import { ActorService } from "@/services/actor.service"
import { MovieService } from "@/services/movie.service"
import { IMovie } from "@/shared/types/movie.types"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { NextPage } from "next"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const MoviePage: NextPage = () => {
  const { slug } = useParams()
  const [movie, setMovie] = useState<IMovie>()
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: movieFetched } = await MovieService.getBySlug(String(slug))
      const { data: similarMoviesFetched } = await MovieService.getByGenres(
        movieFetched.genres.map((genre) => genre._id)
      )

      const similarMoviesItems = getRandomItems(
        similarMoviesFetched.filter((item) => item._id !== movieFetched._id),
        5
      )

      setMovie(movieFetched)
      setSimilarMovies(similarMoviesItems)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="mx-11 mb-6">
        <SkeletonLoader className="mt-6 h-20" count={10} />
      </div>
    )
  }

  return (
    <SingleMovie movie={movie as IMovie} similarMovies={similarMovies || []} />
  )
}

export default MoviePage
