"use client"

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { GenreService } from "@/services/genre.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { useRouter } from "next/navigation"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const router = useRouter()

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

  const { mutateAsync: createAsync } = useMutation(
    "Create Genre for admin panel",
    () => GenreService.createGenre(),
    {
      onError: (error) => {
        toastErrors(error, "Genre Create")
      },
      onSuccess: ({ data: _id }) => {
        toastr.success("Genre created successfully", "Genre create")
        router.push(getAdminUrl(`genres/${_id}/edit`))
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
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  )
}
