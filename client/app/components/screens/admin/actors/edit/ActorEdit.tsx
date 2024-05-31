"use client"

import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { IActorEditInput } from "./actor-edit.interface"
import { useEditActor } from "./useEditActor"
import SkeletonLoader from "@/ui/SkeletonLoader"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import Button from "@/ui/form-elements/Button"
import formStyles from "@/ui/form-elements/admin-form.module.scss"
import TextEditor from "@/ui/form-elements/TextEditor"
import { stripHtml } from "string-strip-html"

const ActorEdit: FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
    trigger,
    control,
  } = useForm<IActorEditInput>({
    mode: "onChange",
  })

  const { isLoading, onSubmit } = useEditActor(setValue)

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
            />

            <div>
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

            {/* <Controller
            control={control}
            name="photo"
            defaultValue={getValues("photo")}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                // upload photo
            )}
            rules={{
              required: "Photo is required"
            }}
          />

          <Controller
            control={control}
            name="bio"
            defaultValue={getValues("bio")}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextEditor
                onChange={onChange}
                placeholder="Bio"
                value={value}
                error={error}
              />
            )}
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) || "Bio is required",
              },
            }}
          /> */}
          </div>
          <Button>Update</Button>
        </>
      )}
    </form>
  )
}

export default ActorEdit
