"use client"

import { FileService } from "@/services/file.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { useMutation } from "react-query"

type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string
) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => FileService.upload(data, folder),
    {
      onSuccess: ({ data }) => {
        onChange(data[0].url)
        setIsLoading(false)
      },
      onError: (error) => {
        toastErrors(error, "Upload file")
        setIsLoading(false)
      },
    }
  )

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true)

      const files = e.target.files
      if (!files?.length) return

      const formData = new FormData()
      formData.append("file", files[0])

      await mutateAsync(formData)

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    },
    [mutateAsync]
  )

  return useMemo(
    () => ({
      uploadFile,
      isLoading,
    }),
    [uploadFile, isLoading]
  )
}
