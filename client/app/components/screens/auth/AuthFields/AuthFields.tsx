import Field from "@/components/ui/form-elements/Field"
import { FC } from "react"
import { FieldError, FormState, UseFormRegister } from "react-hook-form"

interface IAuthFields {
  register: UseFormRegister<any>
  formState: FormState<any>
  isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
      <Field
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        placeholder="email"
        error={errors.email as FieldError}
      />
      <Field
        {...register(
          "password",
          isPasswordRequired
            ? {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }
            : {}
        )}
        placeholder="password"
        type="password"
        error={errors.password as FieldError}
      />
    </>
  )
}

export default AuthFields
