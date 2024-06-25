import Layout from "@/components/layout/Layout"
import { accentColor } from "@/config/constants"
import { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Discovery",
  description: "Collections",
}

export default function DiscoveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      <NextTopLoader color={accentColor} />
      {children}
    </Layout>
  )
}
