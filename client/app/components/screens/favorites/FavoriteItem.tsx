import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import styles from "./Favorites.module.scss"
import { IFavoriteItem } from "./favorites.interface"
import FavoriteButton from "../single-movie/FavoriteButton/FavoriteButton"

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
  return (
    <div className={styles.itemWrapper}>
      <FavoriteButton movieId={item._id} />
      <Link href={item.link}>
        <a className={styles.item}>
          <Image
            alt={item.name}
            src={item.posterPath}
            layout="fill"
            draggable={false}
            priority
          />

          <div className={styles.title}>{item.title}</div>
        </a>
      </Link>
    </div>
  )
}

export default FavoriteItem
