"use client"

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { MovieService } from "@/services/movie.service"
import { getGenresList } from "@/utils/movie/getGenresListEach"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { useRouter } from "next/navigation"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const router = useRouter()

  const queryData = useQuery(
    ["Movies list for admin panel", debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (item) =>
            ({
              _id: item._id,
              editUrl: getAdminUrl(`movies/${item._id}/edit`),
              items: [
                item.title,
                getGenresList(item.genres),
                String(item.rating),
              ],
            }) as unknown as ITableItem[]
        ),
      onError: (error) => {
        toastErrors(error, "Movie list")
      },
    }
  )

  const { mutateAsync: createAsync } = useMutation(
    "Create Movie for admin panel",
    () => MovieService.create(),
    {
      onError: (error) => {
        toastErrors(error, "Movie Create")
      },
      onSuccess: ({ data: _id }) => {
        toastr.success("Movie created successfully", "Movie create")
        router.push(getAdminUrl(`movies/${_id}/edit`))
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    "Delete Movie for admin panel",
    (movieId: string) => MovieService.deleteMovie(movieId),
    {
      onError: (error) => {
        toastErrors(error, "Movie delete")
      },
      onSuccess: (data) => {
        toastr.success("Movie deleted successfully", "Movie delete")
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
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  )
}
