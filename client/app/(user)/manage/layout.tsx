import AllowAdmin from "@/utils/roles/AllowAdmin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Admin panel",
  description: "Costomize app",
}

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AllowAdmin>{children}</AllowAdmin>
}
