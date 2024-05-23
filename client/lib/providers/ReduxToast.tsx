"use client"

import { FC, useEffect, useState } from "react"
import ReduxToastr from "react-redux-toastr"

const ReduxToast: FC = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ReduxToastr
      newestOnTop={false}
      preventDuplicates
      progressBar
      closeOnToastrClick={false}
      timeOut={4000}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  )
}

export default ReduxToast
