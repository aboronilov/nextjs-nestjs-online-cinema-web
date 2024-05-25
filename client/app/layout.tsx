import MainProvider from "@/providers/MainProvider"
import "./globals.scss"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TypeComponentAuthFields } from "@/shared/types/auth.types"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Boronilov Cinema",
  description: "Enjoy watching movies",
}

type BaseProps = Readonly<{
  children: React.ReactNode
}>

type RootLyaoutProps = BaseProps & TypeComponentAuthFields

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <MainProvider>
        <body className={inter.className}>{children}</body>
      </MainProvider>
    </html>
  )
}
