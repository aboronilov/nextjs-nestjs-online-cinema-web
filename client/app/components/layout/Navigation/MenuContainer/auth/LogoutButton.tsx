"use client"

import MaterialIcon from "@/components/ui/MaterialIcon"
import { useActions } from "@/hooks/useActions"
import { useRouter } from "next/navigation"
import { FC, MouseEvent } from "react"

const LogoutButton: FC = () => {
  const { logout } = useActions()
  const router = useRouter()

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    logout()
    router.replace("/")
  }

  return (
    <li>
      <a href="#" onClick={handleLogout}>
        <MaterialIcon name="MdLogout" />
        <span>Logout</span>
      </a>
    </li>
  )
}

export default LogoutButton
