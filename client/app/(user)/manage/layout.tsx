import Layout from "@/components/layout/Layout"
import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
import { accentColor } from "@/config/constants"
import AllowAdmin from "@/utils/roles/AllowAdmin"
import { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"

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
        {/* <Heading title="Statistics" /> */}
        <NextTopLoader color={accentColor} />
        {children}
      </Layout>
    </AllowAdmin>
  )
}
