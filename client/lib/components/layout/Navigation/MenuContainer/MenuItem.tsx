"use client"

import { usePathname } from "next/navigation"
import { FC } from "react"
import styles from "./Menu.module.scss"
import { IMenuItem } from "./menu.interface"
import cn from "classnames"
import Link from "next/link"
import MaterialIcon from "../../../ui/MaterialIcon"

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const pathname = usePathname()
  return (
    <li
      className={cn({
        [styles.active]: pathname === item.link,
      })}
    >
      <Link href={item.link} legacyBehavior>
        <a className={styles.div}>
          <MaterialIcon name={item.icon} />
          <span>{item.title}</span>
        </a>
      </Link>
    </li>
  )
}

export default MenuItem
