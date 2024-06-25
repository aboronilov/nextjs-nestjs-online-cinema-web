// "use client"

import { FC } from "react"
import FavoriteItem from "./FavoriteItem"
import styles from "./Favorites.module.scss"
import { useFavorites } from "./useFavorites"
import { getMovieUrl, getUserUrl } from "@/config/url.config"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
import { getRandomItems } from "@/utils/array/getRandomItems"
import { IMovie } from "@/shared/types/movie.types"
import SubHeading from "@/components/ui/heading/Subheading"
import Link from "next/link"

const Favorites: FC = () => {
  //   const { favoritesMovies, refetch } = useFavorites()
  const random = getRandomItems((favoritesMovies as IMovie[]) || [], 3)

  if (!favoritesMovies?.length) {
    return null
  }

  if (isLoading) {
    return (
      <div className="mt-2">
        <SkeletonLoader count={3} className="h-28 mb-4" />
      </div>
    )
  }

  return (
    <>
      <div className="mt-4">
        <SubHeading title={"Favorites"} />
      </div>
      <section className={styles.favorites}>
        {isLoading ? (
          <SkeletonLoader count={3} className="h-28 mb-4" />
        ) : (
          random?.map((movie) => (
            <FavoriteItem
              key={movie._id}
              item={{
                name: movie.title,
                posterPath: movie.bigPoster,
                link: getMovieUrl(movie.slug),
                title: movie.title,
                _id: movie._id,
              }}
            />
          ))
        )}
      </section>
      <Link href="/profile" legacyBehavior>
        <a className={styles.button}>See more</a>
      </Link>
    </>
  )
}

export default Favorites
