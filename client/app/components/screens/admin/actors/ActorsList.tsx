"use client"

import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"
import Heading from "@/components/ui/heading/Heading"
import { FC } from "react"
import { useActors } from "./useActors"
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"

const ActorsList: FC = () => {
  const {
    isLoading,
    handleSearch,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useActors()

  const tableItems = data ? (data as unknown as ITableItem[]) : []

  return (
    <>
      <Heading title="Actors" />
      <AdminHeader
        searchTerm={searchTerm}
        handeSearch={handleSearch}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        tableItems={tableItems}
        headerItems={["Name", "Movies Count"]}
        removeHandler={deleteAsync}
      />
    </>
  )
}

export default ActorsList
