import { ChangeEvent, FC } from "react"
import styles from "./AdminHeader.module.scss"
import SearchField from "@/ui/search-field/SearchField"
import AdminCreateButton from "./AdminCreateButton"

interface IAdminHeader {
  onClick?: () => void
  searchTerm: string
  handeSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  searchTerm,
  handeSearch,
}) => {
  return (
    <div className={styles.header}>
      <SearchField searchTerm={searchTerm} handleSearch={handeSearch} />
      {onClick ? <AdminCreateButton onClick={onClick} /> : null}
    </div>
  )
}

export default AdminHeader
