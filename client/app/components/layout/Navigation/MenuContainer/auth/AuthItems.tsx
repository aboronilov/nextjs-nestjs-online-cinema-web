"use client"

import { useAuth } from "@/hooks/index"
import { FC } from "react"
import MenuItem from "../MenuItem"
import { getAdminHomeUrl } from "@/config/url.config"
import LogoutButton from "./LogoutButton"

const AuthItems: FC = () => {
  const { user } = useAuth()

  if (user) {
    return (
      <>
        <MenuItem
          item={{
            icon: "MdSettings",
            link: "/profile",
            title: "Profile",
          }}
        />
        {user.isAdmin ? (
          <MenuItem
            item={{
              icon: "MdOutlineLock",
              link: getAdminHomeUrl(),
              title: "Admin",
            }}
          />
        ) : null}
        <LogoutButton />
      </>
    )
  }

  return (
    <>
      <MenuItem
        item={{
          icon: "MdLogin",
          link: "/auth",
          title: "Login",
        }}
      />
    </>
  )
}

export default AuthItems
