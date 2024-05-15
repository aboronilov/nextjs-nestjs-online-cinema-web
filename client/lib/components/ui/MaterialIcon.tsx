import * as MaterialIcons from "react-icons/md"

import { TypeMaterialIconName } from "@/shared/types/icon.type"
import { FC } from "react"

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
  const MaterialComponent = MaterialIcons[name]

  return <MaterialComponent /> || <MaterialIcons.MdDragIndicator />
}

export default MaterialIcon
