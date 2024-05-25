"use client"

import { useAuth } from "@/hooks/index"
import { useLayoutEffect } from "react"
import { redirect } from "next/navigation"

const AllowAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = useAuth()

  useLayoutEffect(() => {
    if (!user?.isAdmin) {
      redirect("/")
    }
  }, [])

  return <>{children}</>
}

export default AllowAdmin
