export interface IEmailPassword {
  email: string
  password: string
}

export interface IUser extends IEmailPassword {
  _id: string
  createdAt: string
  isAdmin: boolean
}
