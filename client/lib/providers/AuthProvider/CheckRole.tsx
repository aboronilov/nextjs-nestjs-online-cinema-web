"use client"

import { useAuth } from "@/hooks/useAuth"
import { TypeComponentAuthFields } from "@/shared/types/auth.types"
import { useRouter } from "next/router"
import { FC } from "react"

const CheckRole: FC<TypeComponentAuthFields> = ({
  Component: { isOnlyAdmin, isOnlyUser },
  children,
}) => {
  const { user } = useAuth()
  const router = useRouter()

  if (user?.isAdmin) return <>{children}</>

  if (isOnlyAdmin) {
    router.replace("/")
    return null
  }

  const isUser = user && !user.isAdmin
  if (isOnlyUser && isUser) {
    return <>{children}</>
  } else {
    router.replace("/auth")
    return null
  }
}

export default CheckRole
