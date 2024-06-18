import { IMovie } from "@/shared/types/movie.types"
import { FC } from "react"
import styles from "./MovieList.module.scss"
import Link from "next/link"
import { getGenreUrl, getMovieUrl } from "@/config/url.config"
import Image from "next/image"
import { getGenresListEach } from "@/utils/movie/getGenresListEach"
import MaterialIcon from "@/components/ui/MaterialIcon"
import { getAssetUrl } from "@/utils/assets/getUrl"

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
  const poster = `/uploads/movies/${movie.slug}/poster.webp`

  return (
    <div className={styles.item}>
      <Link href={getMovieUrl(movie.slug)} legacyBehavior>
        <a>
          <Image
            src={getAssetUrl(poster)}
            width={65}
            height={97}
            alt={movie.title}
            draggable={false}
            // priority
          />
        </a>
      </Link>
      <div className={styles.info}>
        <div className="">
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.genres}>
            {movie.genres.map((item, index) => (
              <Link key={item._id} href={getGenreUrl(item.slug)} legacyBehavior>
                <a>
                  {getGenresListEach(index, movie.genres.length, item.name)}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.rating}>
          <MaterialIcon name="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieItem
