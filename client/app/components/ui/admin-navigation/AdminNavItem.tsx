"use client"

import { FC } from "react"
import { INavItem } from "./admin-nvaigation.interface"
import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./AdminNavigation.module.scss"
import cn from "classnames"

const AdminNavItem: FC<{ item: INavItem }> = ({ item: { title, link } }) => {
  const pathname = usePathname()

  return (
    <li>
      <Link href={link} legacyBehavior>
        <a
          className={cn({
            [styles.active]: pathname === link,
          })}
        >
          {title}
        </a>
      </Link>
    </li>
  )
}

export default AdminNavItem
