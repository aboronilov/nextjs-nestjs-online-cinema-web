import type { Metadata } from "next"
import Heading from "./components/ui/heading/Heading"
import Layout from "./components/layout/Layout"

export const metadata: Metadata = {
  title: "Not found",
  description: "Page not found - 404",
}

export default function NotFound() {
  return (
    <Layout>
      <Heading
        title="Page not found - 404"
        className="text-gray-300 mb-8 text-xl"
      />
    </Layout>
  )
}
