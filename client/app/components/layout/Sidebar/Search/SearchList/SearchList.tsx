import { FC } from "react"
import styles from "./SearchList.module.scss"
import { IMovie } from "@/shared/types/movie.types"
import Link from "next/link"
import Image from "next/image"
import { getMovieUrl } from "@/config/url.config"
import { getAssetUrl } from "@/utils/assets/getUrl"

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map((movie) => {
          return (
            <Link key={movie._id} href={getMovieUrl(movie.slug)} legacyBehavior>
              <a>
                <Image
                  src={getAssetUrl(movie.poster as string)}
                  width={50}
                  height={50}
                  alt={movie.title}
                  objectFit="cover"
                  objectPosition="top"
                  draggable={false}
                />
                <span>{movie.title}</span>
              </a>
            </Link>
          )
        })
      ) : (
        <p className="text-white text-center my-4">No movies found</p>
      )}
    </div>
  )
}

export default SearchList
