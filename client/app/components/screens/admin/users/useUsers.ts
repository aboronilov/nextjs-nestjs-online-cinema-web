"use client"

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { UserService } from "@/services/user.service"
import { convertMongoDBDate } from "@/utils/dates/convertMongoDBDate"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ["Users list for admin panel", debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (item) =>
            ({
              _id: item._id,
              editUrl: getAdminUrl(`user/edit/${item._id}`),
              items: [item.email, convertMongoDBDate(item.createdAt)],
            }) as unknown as ITableItem[]
        ),
      onError: (error) => {
        toastErrors(error, "User list")
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    "Delete user for admin panel",
    (userId: string) => UserService.deleteUser(userId),
    {
      onError: (error) => {
        toastErrors(error, "User delete")
      },
      onSuccess: (data) => {
        toastr.success("User deleted successfully", "User delete")
        queryData.refetch()
      },
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
    }),
    [queryData, searchTerm, deleteAsync]
  )
}
