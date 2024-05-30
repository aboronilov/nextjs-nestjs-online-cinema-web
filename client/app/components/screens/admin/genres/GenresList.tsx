"use client"

import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"
import Heading from "@/components/ui/heading/Heading"
import { FC } from "react"
import { useGenres } from "./useGenres"
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"

const GenresList: FC = () => {
  const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useGenres()

  const tableItems = data ? (data as unknown as ITableItem[]) : []

  console.log(tableItems)

  return (
    <>
      <Heading title="Genres" />
      <AdminHeader searchTerm={searchTerm} handeSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        tableItems={tableItems}
        headerItems={["Name", "Slug"]}
        removeHandler={deleteAsync}
      />
    </>
  )
}

export default GenresList
