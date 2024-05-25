import { FC } from "react"
import styles from "./Layout.module.scss"
import Navigation from "./Navigation/Navigation"
import Sidebar from "./Sidebar/Sidebar"
import MainProvider from "@/providers/MainProvider"
// import { TypeComponentAuthFields } from "@/shared/types/auth.types"

type BaseProps = Readonly<{
  children: React.ReactNode
}>

// type RootLyaoutProps = BaseProps & TypeComponentAuthFields

const Layout = ({ children }: BaseProps) => {
  return (
    <>
      {/* <MainProvider Component={Component}> */}
      <div className={styles.layout}>
        <Navigation />
        <div className={styles.center}>{children}</div>
        <Sidebar />
      </div>
      {/* </MainProvider> */}
    </>
  )
}

export default Layout
