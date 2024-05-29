import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Users",
  description: "Costomize app",
}

export default function ManageUsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}