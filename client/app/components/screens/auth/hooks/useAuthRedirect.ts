"use client"

import { useRouter, useParams } from "next/navigation"
import { useAuth } from "./useAuth"
import { useEffect } from "react"

export const useAuthRedirect = () => {
  const { user } = useAuth()
  const { push } = useRouter()
  const { redirect } = useParams()

  const redirectPath = String(redirect) || "/"

  useEffect(() => {
    if (user) {
      push(redirectPath)
    }
  }, [user, redirectPath, push])
}
