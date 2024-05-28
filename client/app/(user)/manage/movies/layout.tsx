import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Movies",
  description: "Costomize app",
}

export default function ManageMoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
