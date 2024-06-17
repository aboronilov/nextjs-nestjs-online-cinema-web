import { FC } from "react"
import styles from "./Gallery.module.scss"
import { IGalleryItemProps } from "./gallery.interface"
import Link from "next/link"
import cn from "classnames"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
  return (
    <Link href={item.link} legacyBehavior>
      <a
        className={cn(styles.item, {
          [styles.withText]: item.content,
          [styles.horizontal]: variant === "horizontal",
          [styles.vertical]: variant === "vertical",
        })}
      >
        <Image
          alt={item.name}
          src={getAssetUrl(item.posterPath)}
          draggable={false}
          priority
          // width={200}
          fill
          objectFit="cover"
          objectPosition="top"
        />
        {item.content && (
          <div className={styles.content}>
            <div className={styles.title}>{item.content.title}</div>
            {item.content.subTitle && (
              <div className={styles.subTitle}>{item.content.subTitle}</div>
            )}
          </div>
        )}
      </a>
    </Link>
  )
}

export default GalleryItem
