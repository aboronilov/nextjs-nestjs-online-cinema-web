"use client"

import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IProfileInput } from "./profile.interface"
import { useMutation, useQuery } from "react-query"
import { UserService } from "@/services/user.service"
import { getKeys } from "@/utils/objects/getKeys"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { toastr } from "react-redux-toastr"

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
  const { isLoading } = useQuery(
    ["Edit user profile"],
    () => UserService.getProfile(),
    {
      select: ({ data }) => data as IProfileInput,
      onSuccess: (data) => {
        getKeys(data).forEach((item) => {
          setValue(item, data[item])
        })
      },
      onError: (error) => {
        toastErrors(error, "Get user")
      },
    }
  )

  const { mutateAsync } = useMutation(
    "Update user profile",
    (data: IProfileInput) => UserService.updateProfile(data),
    {
      onError: (error) => {
        toastErrors(error, "Update profile")
      },
      onSuccess: () => {
        toastr.success("User updated successfully", "User edit")
      },
    }
  )

  const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
    await mutateAsync(data)
  }

  return { isLoading, onSubmit }
}
