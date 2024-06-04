import { FC } from "react"
import { IUploadField } from "../interface/form.interface"
import { useUpload } from "./useUpload"
import styles from "../form.module.scss"

import cn from "classnames"
import SkeletonLoader from "../../SkeletonLoader"
import Image from "next/image"
import { getAssetUrl } from "@/utils/assets/getUrl"

const UploadField: FC<IUploadField> = (props) => {
  const {
    folder,
    value,
    onChange,
    placeholder,
    error,
    style,
    isNoImage = false,
  } = props

  const { isLoading, uploadFile } = useUpload(onChange, folder)

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadFlex}>
        <label>
          <span>{placeholder}</span>
          <input type="file" onChange={uploadFile} accept="image/*" />
          {error ? <div className={styles.error}>{error.message}</div> : null}
        </label>

        {!isNoImage && (
          <div className={styles.uploadImageContainer}>
            {isLoading ? (
              <SkeletonLoader count={1} className="w-full h-full" />
            ) : (
              value && (
                <Image
                  alt="image"
                  src={getAssetUrl(value as string) as string}
                  unoptimized
                  width={60}
                  height={60}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadField
