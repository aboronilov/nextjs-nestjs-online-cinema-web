import { FC } from "react"

import styles from "./AdminCreateButton.module.scss"
import Button from "@/components/ui/form-elements/Button"

interface IAdminCreateButton {
  onClick: () => void
}

const AdminCreateButton: FC<IAdminCreateButton> = ({ onClick }) => {
  return <Button onClick={onClick}>Create new</Button>
}

export default AdminCreateButton
