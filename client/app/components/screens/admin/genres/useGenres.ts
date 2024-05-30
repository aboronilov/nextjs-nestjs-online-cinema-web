"use client"

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { GenreService } from "@/services/genre.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ["Genres list for admin panel", debouncedSearch],
    () => GenreService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (item) =>
            ({
              _id: item._id,
              editUrl: getAdminUrl(`genres/${item._id}/edit`),
              items: [item.name, item.slug],
            }) as unknown as ITableItem[]
        ),
      onError: (error) => {
        toastErrors(error, "Genre list")
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    "Delete Genre for admin panel",
    (genreId: string) => GenreService.deleteGenre(genreId),
    {
      onError: (error) => {
        toastErrors(error, "Genre delete")
      },
      onSuccess: (data) => {
        toastr.success("Genre deleted successfully", "Genre delete")
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
