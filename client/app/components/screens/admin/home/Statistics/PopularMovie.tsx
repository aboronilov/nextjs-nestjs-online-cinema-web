"use client"

import styles from "../Admin.module.scss"
import { MovieService } from "@/services/movie.service"
import { IMovie } from "@/shared/types/movie.types"
import { FC } from "react"
import { useQuery } from "react-query"
import cn from "classnames"
import Subheading from "@/components/ui/heading/Subheading"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
import Link from "next/link"
import { getMovieUrl } from "@/config/url.config"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

const PopularMovie: FC = () => {
  const { isLoading, data } = useQuery(
    "Pupular movie for admin",
    () => MovieService.getMostPopularMovies(),
    {
      select: ({ data }) => data[0] as IMovie,
    }
  )

  return (
    <div className={cn(styles.block, styles.popular)}>
      <Subheading title="The most popular movie" />
      {isLoading ? (
        <SkeletonLoader className="h-48" />
      ) : (
        <>
          <h3>Opened {data?.countOpened} times</h3>
          <Link legacyBehavior href={getMovieUrl(data?.slug as string)}>
            <a>
              <Image
                src={getAssetUrl(data?.bigPoster)}
                alt={data?.title as string}
                width={285}
                height={176}
                className={styles.image}
                unoptimized
              />
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export default PopularMovie
