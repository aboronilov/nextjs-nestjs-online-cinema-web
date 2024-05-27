import { FC } from "react"
import { ITableItem } from "./admin-table.interface"
import AdminTableHeader from "./AdminTableHeader"
import AdminTableItem from "./AdminTableItem"
import SkeletonLoader from "@/ui/SkeletonLoader"

import styles from "./AdminTable.module.scss"

interface IAdminTable {
  tableItems: ITableItem[]
  isLoading: boolean
  headerItems: string[]
  removeHandler: (userId: string) => void
}

const AdminTable: FC<IAdminTable> = ({
  tableItems,
  isLoading,
  headerItems,
  removeHandler,
}) => {
  return (
    <div>
      <AdminTableHeader headerItems={headerItems} />
      {isLoading ? (
        <SkeletonLoader count={1} height={48} className="mt-4" />
      ) : null}
      {!isLoading && tableItems.length === 0 && (
        <div className={styles.notFound}>
          <p>No items</p>
        </div>
      )}
      {tableItems.map((tableItem) => (
        <AdminTableItem
          key={tableItem._id}
          tableItem={tableItem}
          removeHandler={() => removeHandler(tableItem._id)}
        />
      ))}
    </div>
  )
}

export default AdminTable
