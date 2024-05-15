import { TypeMaterialIconName } from "@/shared/interface/icon.type"

export interface IMenuItem {
  icon: TypeMaterialIconName
  title: string
  link: string
}

export interface IMenu {
  title: string
  items: IMenuItem[]
}
