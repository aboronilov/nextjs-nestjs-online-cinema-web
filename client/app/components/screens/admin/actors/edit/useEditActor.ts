"use client"

import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IActorEditInput } from "./actor-edit.interface"
import { useRouter, useParams } from "next/navigation"
import { useMutation, useQuery } from "react-query"
import { ActorService } from "@/services/actor.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { getKeys } from "@/utils/objects/getKeys"
import { toastr } from "react-redux-toastr"
import { getAdminUrl } from "@/config/url.config"

export const useEditActor = (setValue: UseFormSetValue<IActorEditInput>) => {
  const router = useRouter()
  const params = useParams()
  const actorId = String(params.id)

  const { isLoading } = useQuery(
    ["Edit Actor from admin", actorId],
    () => ActorService.getById(actorId),
    {
      select: ({ data }) => data as IActorEditInput,
      onSuccess: (data) => {
        setValue("bio", data.bio)
        setValue("countMovies", data.countMovies)
        setValue("name", data.name)
        setValue("photo", data.photo)
        setValue("slug", data.slug)
      },
      onError: (error) => {
        toastErrors(error, "Actor edit")
      },
      enabled: !!actorId,
    }
  )

  const { mutateAsync } = useMutation(
    "Update Actor from admin",
    (data: IActorEditInput) => ActorService.update(actorId, data),
    {
      onError: (error) => {
        toastErrors(error, "Update edit")
      },
      onSuccess: () => {
        toastr.success("Actor updated successfully", "Actor edit")
        router.push(getAdminUrl("Actors"))
      },
    }
  )

  const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { isLoading, onSubmit, actorId }
}
