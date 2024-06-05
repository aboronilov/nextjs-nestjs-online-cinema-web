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
import UploadField from "@/components/ui/form-elements/UploadField/UploadField"

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
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              error={errors.title}
              style={{ width: "31%" }}
            />

            <div style={{ width: "31%" }}>
              <SlugField
                error={errors.slug}
                register={register}
                generate={() => {
                  setValue(
                    "slug",
                    getValues("title").toLowerCase().replace(/\s/g, "-")
                  )
                  trigger("slug")
                }}
              />
            </div>

            <Field
              {...register("parameters.country", {
                required: "country is required",
              })}
              placeholder="Country"
              error={errors.parameters?.country}
              style={{ width: "31%" }}
            />

            <Field
              {...register("parameters.duration", {
                required: "duration is required",
              })}
              placeholder="Duration"
              error={errors.parameters?.duration}
              style={{ width: "31%" }}
            />

            <Field
              {...register("parameters.year", {
                required: "Year is required",
              })}
              placeholder="Year"
              error={errors.parameters?.year}
              style={{ width: "31%" }}
            />

            {/* React Select */}

            <Controller
              control={control}
              name="poster"
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder={`movies/${getValues("slug")}`}
                  placeholder="Poster"
                />
              )}
              rules={{
                required: "poster is required",
              }}
            />

            <Controller
              control={control}
              name="bigPoster"
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder={`movies/${getValues("slug")}`}
                  placeholder="Big poster"
                />
              )}
              rules={{
                required: "Big poster is required",
              }}
            />

            <Controller
              control={control}
              name="videoUrl"
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder={`movies/${getValues("slug")}`}
                  placeholder="Video"
                  isNoImage
                  style={{ marginTop: -25 }}
                />
              )}
              rules={{
                required: "Video is required",
              }}
            />
          </div>

          <Button>Update</Button>
        </>
      )}
    </form>
  )
}

export default MovieEdit
