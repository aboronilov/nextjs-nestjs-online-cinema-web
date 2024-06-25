import { FC } from "react"
import { ICollection } from "./collections.interface"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

const CollectionImage: FC<{ collection: ICollection }> = ({
  collection: { image, title },
}) => {
  return <Image alt={title} src={getAssetUrl(image)} fill objectFit="cover" />
}

export default CollectionImage
