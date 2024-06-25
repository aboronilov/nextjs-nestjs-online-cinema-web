"use client"

import SkeletonLoader from "@/components/ui/SkeletonLoader"
import { MovieService } from "@/services/movie.service"
import { FC } from "react"
import { useQuery } from "react-query"
import MovieList from "./MovieList"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { IMovie } from "@/shared/types/movie.types"

const PopularMovies: FC = () => {
  const { isLoading, data } = useQuery(
    "Popular movies in sidebar",
    () => MovieService.getMostPopularMovies(),
    {
      select: ({ data }) => data,
    }
  )

  if (isLoading) {
    return (
      <div className="mt-11">
        <SkeletonLoader count={3} className="h-28 mb-4" />
      </div>
    )
  }

  const random = getRandomItems(data as IMovie[], 5)

  return <MovieList title="Popular" link="/trending" movies={random || []} />
}

export default PopularMovies
