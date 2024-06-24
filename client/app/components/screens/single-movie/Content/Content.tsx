import { FC } from "react"
import { IMovie } from "@/shared/types/movie.types"
import styles from "./Content.module.scss"
import ContentList from "./ContentList/ContentList"
import { getActorUrl, getGenreUrl } from "@/config/url.config"
import MaterialIcon from "@/components/ui/MaterialIcon"

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className={styles.content}>
      <h1>{movie.title}</h1>
      <h2>{movie.description}</h2>
      <div className={styles.details}>
        <span>{movie.parameters.year} ~ </span>
        <span>{movie.parameters.country} ~ </span>
        <span>{movie.parameters.duration} min.</span>
      </div>

      <ContentList
        name="Genres"
        links={movie.genres.map((item) => ({
          _id: item._id,
          title: item.name,
          link: getGenreUrl(item.slug),
        }))}
      />

      <ContentList
        name="Actors"
        links={movie.actors.map((item) => ({
          _id: item._id,
          title: item.name,
          link: getActorUrl(item.slug),
        }))}
      />

      <div className={styles.rating}>
        <MaterialIcon name="MdStarRate" />
        <span>{movie.rating.toFixed(1)}</span>
      </div>

      {/* Favorite button */}
    </div>
  )
}

export default Content
