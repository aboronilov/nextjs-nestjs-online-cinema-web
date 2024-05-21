"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import ReduxToast from "./ReduxToast"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import NextTopLoader from "nextjs-toploader"
import { accentColor } from "@/config/constants"
import { useEffect, useState } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color={accentColor} />
        <ReduxToast />
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default MainProvider
