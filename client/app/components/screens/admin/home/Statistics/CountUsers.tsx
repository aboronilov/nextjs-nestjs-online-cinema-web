"use client"

import { AdminService } from "@/services/admin.service"
import { FC } from "react"
import { useQuery } from "react-query"
import cn from "classnames"
import styles from "../Admin.module.scss"

const CountUsers: FC = () => {
  const { isLoading, data } = useQuery(
    "Count users",
    () => AdminService.getCountUsers(),
    {
      select: ({ data }) => data,
    }
  )

  // if (true) {
  //   return <SkeletonLoader className="h-5" />
  // }

  return (
    <div className={cn(styles.block, styles.countUsers)}>
      {isLoading ? <div>...</div> : <div className={styles.number}>{data}</div>}
      <div className={styles.description}>users</div>
    </div>
  )
}

export default CountUsers
