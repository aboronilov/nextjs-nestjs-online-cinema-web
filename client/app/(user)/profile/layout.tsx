import { accentColor } from "@/config/constants"
import AllowUser from "@/utils/roles/AllowUser"
import { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Profile",
  description: "Your movies",
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AllowUser>
      <NextTopLoader color={accentColor} />
      {children}
    </AllowUser>
  )
}
