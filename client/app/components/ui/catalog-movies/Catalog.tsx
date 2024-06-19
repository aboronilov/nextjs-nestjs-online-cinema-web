import { FC } from "react"
import { ICatalog } from "./catalog.interface"
import Heading from "@/components/ui/heading/Heading"
import styles from "./Catalog.module.scss"
import Description from "../heading/Description"
import { getMovieUrl } from "@/config/url.config"
import GalleryItemFill from "../gallery/GalleryItemFill"

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
  return (
    <>
      <Heading title={title} className={styles.heading} />

      {description && (
        <Description text={description} className={styles.description} />
      )}

      <section className={styles.movies}>
        {movies.map((item) => (
          <GalleryItemFill
            key={item._id}
            item={{
              name: item.title,
              link: getMovieUrl(item.slug),
              posterPath: `/uploads/movies/${item.slug}/big-poster.webp`,
              content: {
                title: item.title,
                // subTitle: item.description,
              },
            }}
            variant="horizontal"
          />
        ))}
      </section>
    </>
  )
}

export default Catalog
