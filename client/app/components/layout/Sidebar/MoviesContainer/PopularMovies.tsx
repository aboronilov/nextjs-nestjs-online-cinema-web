"use client"

import SkeletonLoader from "@/components/ui/SkeletonLoader"
import { MovieService } from "@/services/movie.service"
import { FC } from "react"
import { useQuery } from "react-query"
import MovieList from "./MovieList"

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

  return <MovieList title="Popular" link="/trending" movies={data || []} />
}

export default PopularMovies
