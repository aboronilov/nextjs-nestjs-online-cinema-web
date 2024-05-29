"use client"

import { FC } from "react"
import { useForm } from "react-hook-form"
import { IGenreEditInput } from "./genre-edit.interface"
import { useEditGenre } from "./useEditGenre"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
import Field from "@/components/ui/form-elements/Field"

const GenreEdit: FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm<IGenreEditInput>({
    mode: "onChange",
  })

  const { isLoading, onSubmit } = useEditGenre(setValue)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
        <>
          <div>
            <Field
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              error={errors.name}
              style={{ width: "31%" }}
            />

            <div style={{ width: "31%" }}>{/* SLUG */}</div>

            <Field
              {...register("icon", { required: "Icon is required" })}
              placeholder="Icon"
              error={errors.icon}
              style={{ width: "31%" }}
            />

            {/* Text editor draft JS */}
            <button>Update</button>
          </div>
        </>
      )}
    </form>
  )
}

export default GenreEdit
