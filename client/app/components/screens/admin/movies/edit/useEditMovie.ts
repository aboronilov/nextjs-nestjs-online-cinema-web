"use client"

import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IMovieEditInput } from "./movie-edit.interface"
import { useRouter, useParams } from "next/navigation"
import { useMutation, useQuery } from "react-query"
import { MovieService } from "@/services/movie.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { getKeys } from "@/utils/objects/getKeys"
import { toastr } from "react-redux-toastr"
import { getAdminUrl } from "@/config/url.config"

export const useEditMovie = (setValue: UseFormSetValue<IMovieEditInput>) => {
  const router = useRouter()
  const params = useParams()
  const movieId = String(params.id)

  const { isLoading } = useQuery(
    ["Edit Movie from admin", movieId],
    () => MovieService.getById(movieId),
    {
      select: ({ data }) => data as IMovieEditInput,
      onSuccess: (data) => {
        getKeys(data).forEach((item) => {
          setValue(item, data[item])
        })
      },
      onError: (error) => {
        toastErrors(error, "Movie edit")
      },
      enabled: !!movieId,
    }
  )

  const { mutateAsync } = useMutation(
    "Update Movie from admin",
    (data: IMovieEditInput) => MovieService.update(movieId, data),
    {
      onError: (error) => {
        toastErrors(error, "Update edit")
      },
      onSuccess: () => {
        toastr.success("Movie updated successfully", "Movie edit")
        router.push(getAdminUrl("movies"))
      },
    }
  )

  const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { isLoading, onSubmit }
}
