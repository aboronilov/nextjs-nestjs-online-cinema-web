"use client"

import { FC } from "react"

import styles from "./Profile.module.scss"
import { useForm } from "react-hook-form"
import { IProfileInput } from "./profile.interface"
import { useProfile } from "./useProfile"
import Layout from "@/components/layout/Layout"
import Heading from "@/components/ui/heading/Heading"
import Button from "@/components/ui/form-elements/Button"
import AuthFields from "../auth/AuthFields/AuthFields"
import SkeletonLoader from "@/components/ui/SkeletonLoader"

const Profile: FC = () => {
  const { handleSubmit, register, formState, setValue } =
    useForm<IProfileInput>({
      mode: "onChange",
    })

  const { isLoading, onSubmit } = useProfile(setValue)

  return (
    <Layout>
      <Heading title="Profile" className="mb-6" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isLoading ? (
          <SkeletonLoader count={2} className="my-4 h-12" />
        ) : (
          <AuthFields register={register} formState={formState} />
        )}

        <div className={styles.buttons}>
          <Button type="submit" disabled={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default Profile
