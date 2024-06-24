import { FC, Fragment } from "react"

import styles from "./ContentList.module.scss"
import { IContentList } from "./content.interface"
import Link from "next/link"

const ContentList: FC<IContentList> = ({ links, name }) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{name}</div>
      <div className={styles.links}>
        {links.map((item, idx) => (
          <Fragment key={idx}>
            <Link href={item.link} legacyBehavior>
              <a className={styles.link}>{item.title}</a>
            </Link>
            {idx + 1 !== links.length ? ", " : ""}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ContentList
