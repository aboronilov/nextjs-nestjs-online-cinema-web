import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Genres",
  description: "Costomize app",
}

export default function ManageGenresLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
