"use client"

import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"
import Heading from "@/components/ui/heading/Heading"
import { FC } from "react"
import { useUsers } from "./useUsers"
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"

const UserList: FC = () => {
  const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useUsers()

  const tableItems = data ? (data as unknown as ITableItem[]) : []

  return (
    <>
      <Heading title="Users" />
      <AdminHeader searchTerm={searchTerm} handeSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        tableItems={tableItems}
        headerItems={["Email", "Registration Date"]}
        removeHandler={deleteAsync}
      />
    </>
  )
}

export default UserList
