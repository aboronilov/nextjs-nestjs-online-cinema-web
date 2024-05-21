"use client"

import { FC, useState } from "react"
import { useAuthRedirect } from "./hooks/useAuthRedirect"
import { useAuth } from "./hooks/useAuth"
import { SubmitHandler, useForm } from "react-hook-form"
import { IAuthInput } from "./interfaces/auth.interface"
import styles from "./Auth.module.scss"
import { Metadata } from "next"
import Heading from "@/components/ui/heading/Heading"
import Button from "@/components/ui/form-elements/Button"
import Layout from "@/components/layout/Layout"
import AuthFields from "./AuthFields/AuthFields"

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication",
}

const Auth: FC = () => {
  useAuthRedirect()

  const { isLoading } = useAuth()
  const [type, setType] = useState<"register" | "login">("login")

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  })

  const login = ({ email, password }: IAuthInput) => {
    console.log(`email: ${email}, password: ${password}`)
  }
  const register = ({ email, password }: IAuthInput) => {
    console.log(`email: ${email}, password: ${password}`)
  }

  const onSubmit: SubmitHandler<IAuthInput> = ({ email, password }) => {
    if (type === "login") {
      login({ email, password })
    } else {
      register({ email, password })
    }
    reset()
  }

  return (
    <Layout>
      <section className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading
            title={
              type === "login"
                ? "Sign in to your account"
                : "Create new account"
            }
            className="mb-6"
          />

          <AuthFields
            register={registerInput}
            formState={formState}
            isPasswordRequired
          />

          <div className={styles.buttons}>
            <Button
              type="submit"
              onClick={() => setType("login")}
              disabled={isLoading}
            >
              Login
            </Button>
            <Button
              type="submit"
              onClick={() => setType("register")}
              disabled={isLoading}
            >
              Register
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default Auth
