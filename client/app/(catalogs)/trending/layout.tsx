import Layout from "@/components/layout/Layout"
import { accentColor } from "@/config/constants"
import { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Trending movies",
  description: "Trending now",
}

export default function FreshLayout({
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
