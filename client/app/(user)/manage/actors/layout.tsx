import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boronilov Cinema | Actors",
  description: "Costomize app",
}

export default function ManageActorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
