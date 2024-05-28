"use client"

import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"
import Heading from "@/components/ui/heading/Heading"
import { FC } from "react"
import { useMovies } from "./useMovies"
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"

const MoviesList: FC = () => {
  const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useMovies()

  const tableItems = data ? (data as unknown as ITableItem[]) : []

  return (
    <>
      <Heading title="Movies" />
      <AdminHeader searchTerm={searchTerm} handeSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        tableItems={tableItems}
        headerItems={["Title", "Genres", "Rating"]}
        removeHandler={deleteAsync}
      />
    </>
  )
}

export default MoviesList
