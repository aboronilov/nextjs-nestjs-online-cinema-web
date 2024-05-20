"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import ReduxToast from "./ReduxToast"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import HeadProvider from "./HeadProvider"
import NextTopLoader from "nextjs-toploader"
import { accentColor } from "@/config/constants"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader color={accentColor} />
          <ReduxToast />
          {children}
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}

export default MainProvider
