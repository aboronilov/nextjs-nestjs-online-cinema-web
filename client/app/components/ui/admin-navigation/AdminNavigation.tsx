import { FC } from "react"

import styles from "./AdminNavigation.module.scss"
import { navItems } from "./admin-nvaigation.data"
import AdminNavItem from "./AdminNavItem"

const AdminNavigation: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        {navItems.map((item) => (
          <AdminNavItem key={item.title} item={item} />
        ))}
      </ul>
    </nav>
  )
}

export default AdminNavigation
