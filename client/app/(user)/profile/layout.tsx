import AllowUser from "@/utils/roles/AllowUser"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Profile",
  description: "Your movies",
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AllowUser>{children}</AllowUser>
}
