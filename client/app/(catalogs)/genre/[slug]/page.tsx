"use client"

import SkeletonLoader from "@/components/ui/SkeletonLoader"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"
import { IGenre, IMovie } from "@/shared/types/movie.types"
import { NextPage } from "next"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const GenrePage: NextPage = () => {
  const { slug } = useParams()
  const [movies, setMovies] = useState<IMovie[]>([])
  const [genre, setGenre] = useState<IGenre | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: genreFetched } = await GenreService.getBySlug(String(slug))
      const { data: moviesFetched } = await MovieService.getByGenres([
        genreFetched._id,
      ])

      setMovies(moviesFetched)
      setGenre(genreFetched)
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

  const description = genre ? `${genre.description}` : `loading...`

  return (
    <Catalog
      movies={movies || []}
      title={`${slug}`.toUpperCase() || ""}
      description={description}
    />
  )
}

export default GenrePage
