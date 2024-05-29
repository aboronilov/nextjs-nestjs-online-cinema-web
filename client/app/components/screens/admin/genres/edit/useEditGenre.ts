"use client"

import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IGenreEditInput } from "./genre-edit.interface"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { GenreService } from "@/services/genre.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { getKeys } from "@/utils/objects/getKeys"
import { toastr } from "react-redux-toastr"
import { getAdminUrl } from "@/config/url.config"

export const useEditGenre = (setValue: UseFormSetValue<IGenreEditInput>) => {
  const { push, query } = useRouter()
  const genreId = String(query.id)

  const { isLoading } = useQuery(
    ["Edit genre from admin", genreId],
    () => GenreService.getById(genreId),
    {
      select: ({ data }) => data as IGenreEditInput,
      onSuccess: (data) => {
        getKeys(data).forEach((item) => {
          setValue(item, data[item])
        })
      },
      onError: (error) => {
        toastErrors(error, "Genre edit")
      },
      enabled: !!genreId,
    }
  )

  const { mutateAsync } = useMutation(
    "Update genre from admin",
    (data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
    {
      onError: (error) => {
        toastErrors(error, "Update edit")
      },
      onSuccess: () => {
        toastr.success("Genre updated successfully", "Genre edit")
        push(getAdminUrl("genres"))
      },
    }
  )

  const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { isLoading, onSubmit }
}
