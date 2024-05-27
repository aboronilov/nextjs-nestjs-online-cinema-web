import Heading from "@/components/ui/heading/Heading"
import { FC } from "react"
import Statistics from "./Statistics/Statistics"

const Admin: FC = () => {
  return (
    <>
      <Heading title="Statistics" />
      <Statistics />
    </>
  )
}

export default Admin
