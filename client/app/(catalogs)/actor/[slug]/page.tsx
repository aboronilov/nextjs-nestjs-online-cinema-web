"use client"

import SkeletonLoader from "@/components/ui/SkeletonLoader"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import Gallery from "@/components/ui/gallery/Gallery"
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface"
import { getActorUrl } from "@/config/url.config"
import { ActorService } from "@/services/actor.service"
import { MovieService } from "@/services/movie.service"
import { IActor, IMovie } from "@/shared/types/movie.types"
import { NextPage } from "next"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ActorPage: NextPage = () => {
  const { slug } = useParams()
  const [movies, setMovies] = useState<IMovie[]>([])
  const [actor, setActor] = useState<IActor | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: actorFetched } = await ActorService.getBySlug(String(slug))
      const { data: moviesFetched } = await MovieService.getByActor(
        String(actorFetched._id)
      )

      setMovies(moviesFetched)
      setActor(actorFetched)
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

  const description = actor ? `${actor.bio}` : `loading...`

  const galleryItems: IGalleryItem[] = [actor].map((item) => ({
    name: item?.name as string,
    posterPath: `/uploads/actors/${item?.slug}.webp`,
    link: getActorUrl(item?.slug as string),
    // content: {
    //   title: item.name,
    //   subTitle: `+ ${item.countMovies} movies`,
    // },
  }))

  return (
    <>
      <Gallery items={galleryItems} />
      <Catalog
        movies={movies || []}
        title={`${actor?.name}`.toUpperCase() || ""}
        description={description}
      />
    </>
  )
}

export default ActorPage
