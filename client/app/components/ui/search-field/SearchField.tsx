import { ChangeEvent, FC } from "react"

import styles from "./SearchField.module.scss"
import MaterialIcon from "../MaterialIcon"

interface ISearchField {
  searchTerm: string
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles.search}>
      <MaterialIcon name="MdSearch" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
      />
    </div>
  )
}

export default SearchField
