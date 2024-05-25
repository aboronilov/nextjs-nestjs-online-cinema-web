"use client"

import { useAuth } from "@/hooks/index"
import { useLayoutEffect } from "react"
import { redirect } from "next/navigation"

const AllowUser = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = useAuth()

  useLayoutEffect(() => {
    if (!user) {
      redirect("/auth")
    }
    if (user?.isAdmin) {
      redirect("/")
    }
  }, [])

  return <>{children}</>
}

export default AllowUser
