"use client"

import { useEffect, useState } from "react"
import NextNProgress from "nextjs-progressbar"
import { accentColor } from "@/config/constants"

const HeadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <>
      <NextNProgress
        color={accentColor}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      {children}
    </>
  )
}

export default HeadProvider
