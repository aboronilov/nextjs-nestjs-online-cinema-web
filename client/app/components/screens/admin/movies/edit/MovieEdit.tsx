"use client"

import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { IMovieEditInput } from "./movie-edit.interface"
import { useEditMovie } from "./useEditMovie"
import SkeletonLoader from "@/ui/SkeletonLoader"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import Button from "@/ui/form-elements/Button"
import formStyles from "@/ui/form-elements/admin-form.module.scss"
import TextEditor from "@/ui/form-elements/TextEditor"
import { stripHtml } from "string-strip-html"

const MovieEdit: FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
    trigger,
    control,
  } = useForm<IMovieEditInput>({
    mode: "onChange",
  })

  const { isLoading, onSubmit } = useEditMovie(setValue)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
        <>
          <div className={formStyles.fields}>
            <Field
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              error={errors.name}
              style={{ width: "31%" }}
            />

            <div style={{ width: "31%" }}>
              <SlugField
                error={errors.slug}
                register={register}
                generate={() => {
                  setValue(
                    "slug",
                    getValues("name").toLowerCase().replace(/\s/g, "-")
                  )
                  trigger("slug")
                }}
              />
            </div>

            <Field
              {...register("icon", { required: "Icon is required" })}
              placeholder="Icon"
              error={errors.icon}
              style={{ width: "31%" }}
            />
          </div>

          <Controller
            control={control}
            name="description"
            defaultValue={getValues("description")}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextEditor
                onChange={onChange}
                placeholder="Description"
                value={value}
                error={error}
              />
            )}
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) ||
                  "Description is required",
              },
            }}
          />

          <Button>Update</Button>
        </>
      )}
    </form>
  )
}

export default MovieEdit
