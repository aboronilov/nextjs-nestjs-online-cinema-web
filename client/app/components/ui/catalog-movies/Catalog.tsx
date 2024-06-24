import { FC } from "react"
import { ICatalog } from "./catalog.interface"
import Heading from "@/components/ui/heading/Heading"
import styles from "./Catalog.module.scss"
import Description from "../heading/Description"
import { getMovieUrl } from "@/config/url.config"
import GalleryItemFill from "../gallery/GalleryItemFill"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"
import Subheading from "../heading/Subheading"

const Catalog: FC<ICatalog> = ({ movies, title, description, imageUrl }) => {
  return (
    <>
      <Heading title={title} className={styles.heading} />

      <div className="relative w-[160px] h-[240px]">
        {imageUrl && (
          <Image
            alt={title}
            src={getAssetUrl(imageUrl)}
            fill
            objectFit="cover"
            // width={300}
            // height={400}
          />
        )}
      </div>

      <div className="mt-6">
        <Subheading title="Biography" />
      </div>

      {description && (
        <Description text={description} className={styles.description} />
      )}

      <div className="mt-6">
        <Subheading title="Filmography" />
      </div>

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
