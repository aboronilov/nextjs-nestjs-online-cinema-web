import { FC } from "react"
import { ICollection } from "./collections.interface"
import Link from "next/link"
import { getGenreUrl } from "@/config/url.config"
import styles from "./Collections.module.scss"
import CollectionImage from "./CollectionImage"
import cn from "classnames"

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
  return (
    <Link href={getGenreUrl(collection.slug)} legacyBehavior>
      <a className={styles.collection}>
        <CollectionImage collection={collection} />

        <div className="">
          <div>{collection.title}</div>
        </div>

        <div className={cn(styles.behind, styles.second)}>
          <CollectionImage collection={collection} />
        </div>

        <div className={cn(styles.behind, styles.third)}>
          <CollectionImage collection={collection} />
        </div>
      </a>
    </Link>
  )
}

export default CollectionItem
