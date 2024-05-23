import { IUser } from "@/shared/types/user.types"

export interface IUserState {
  email: string
  isAdmin: boolean
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean
  }
}
