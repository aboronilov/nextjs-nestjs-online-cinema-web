export interface ILink {
  _id: string
  title: string
  link: string
}

export interface IContentList {
  name: string
  links: ILink[]
}
