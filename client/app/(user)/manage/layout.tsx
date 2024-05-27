import Layout from "@/components/layout/Layout"
import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
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
  return (
    <AllowAdmin>
      <Layout>
        <AdminNavigation />
        <Heading title="Statistics" />
        {children}
      </Layout>
    </AllowAdmin>
  )
}
