"use client"

import { FC } from "react"
import styles from "./Search.module.scss"
import { useSearch } from "./useSearch"
import SearchList from "./SearchList/SearchList"
import SearchField from "@/components/ui/search-field/SearchField"

const Search: FC = () => {
  const { isSuccess, handleSearch, data, searchTerm } = useSearch()

  return (
    <div className={styles.wrapper}>
      <SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
      {isSuccess ? <SearchList movies={data || []} /> : null}
    </div>
  )
}

export default Search
