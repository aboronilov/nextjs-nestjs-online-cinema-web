"use client"

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { ActorService } from "@/services/actor.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { useRouter } from "next/navigation"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useActors = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const router = useRouter()

  const queryData = useQuery(
    ["Actors list for admin panel", debouncedSearch],
    () => ActorService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (item) =>
            ({
              _id: item._id,
              editUrl: getAdminUrl(`actor/edit/${item._id}`),
              items: [item.name, String(item.countMovies)],
            }) as unknown as ITableItem[]
        ),
      onError: (error) => {
        toastErrors(error, "Actor list")
      },
    }
  )

  const { mutateAsync: createAsync } = useMutation(
    "Create Actor for admin panel",
    () => ActorService.create(),
    {
      onError: (error) => {
        toastErrors(error, "Actor Create")
      },
      onSuccess: ({ data: _id }) => {
        toastr.success("Actor created successfully", "Actor create")
        router.push(getAdminUrl(`actors/${_id}/edit`))
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    "Delete Actor for admin panel",
    (actorId: string) => ActorService.deleteActor(actorId),
    {
      onError: (error) => {
        toastErrors(error, "Actor delete")
      },
      onSuccess: (data) => {
        toastr.success("Actor deleted successfully", "Actor delete")
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
