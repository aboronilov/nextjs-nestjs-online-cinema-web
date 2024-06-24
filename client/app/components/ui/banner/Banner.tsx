import { FC } from "react"
import Image from "next/image"

import styles from "./Banner.module.scss"
import { getAssetUrl } from "@/utils/assets/getUrl"

interface IBanner {
  image: string
  Details?: FC | null
}

const Banner: FC<IBanner> = ({ image, Details }) => {
  return (
    <div className={styles.banner}>
      <Image
        src={getAssetUrl(image)}
        draggable={false}
        fill
        className="image-like-bg object-top"
        unoptimized
        priority
        alt="Banner"
      />
      {Details && <Details />}
    </div>
  )
}

export default Banner
