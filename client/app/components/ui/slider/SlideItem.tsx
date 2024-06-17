"use client"

import { FC } from "react"
import { ISlide } from "./slider.interface"
import { useRouter } from "next/navigation"
import cn from "classnames"
import styles from "./Slider.module.scss"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

interface ISlideItem {
  slide: ISlide
  buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = "Watch" }) => {
  const router = useRouter()
  return (
    <div className={cn(styles.slide)}>
      {slide.bigPoster && (
        <Image
          src={getAssetUrl(slide.bigPoster)}
          className="object-cover pointer-events-none object-center"
          alt={slide.title}
          draggable={false}
          height={160}
          width={480}
          priority
          objectFit="cover"
        />
      )}

      <div className={styles.content}>
        <div className={styles.heading}>{slide.title}</div>
        <div className={styles.subHeading}>{slide.subTitle}</div>
        <button
          className={styles.button}
          onClick={() => router.push(slide.link)}
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  )
}

export default SlideItem
