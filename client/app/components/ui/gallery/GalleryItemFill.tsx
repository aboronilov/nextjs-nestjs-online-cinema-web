import { FC } from "react"
import styles from "./Gallery.module.scss"
import { IGalleryItemProps } from "./gallery.interface"
import Link from "next/link"
import cn from "classnames"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

const GalleryItemFill: FC<IGalleryItemProps> = ({ item, variant }) => {
  return (
    <Link
      href={item.link}
      className="w-full flex flex-col flex-wrap sm:w-[45%] lg:w-[31%]"
    >
      <div className="relative w-full h-80">
        <Image
          src={getAssetUrl(item.posterPath)}
          alt={item.name}
          fill
          sizes="25vw"
          className="absolute object-cover rounded-md hover:opacity-70 hover:scale-105 transition-all ease-in-out duration-500"
        />
        {item.content && (
          <div className="relative z-2 text-center mt-36 w-full">
            <div className="font-semibold text-white text-shadow">
              {item.content.title}
            </div>
            {item.content.subTitle && (
              <div className="text-xs">{item.content.subTitle}</div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default GalleryItemFill
