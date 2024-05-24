import { axiosClassic } from "@/api/interceptors"
import { getAuthUrl } from "@/config/api.config"
import { IEmailPassword } from "@/shared/types/user.types"
import { IAuthResponse, ITokens } from "@/store/user/user.interface"
import {
  clearStorage,
  getStoreLocal,
  saveToLocalStorage,
} from "@/utils/local-storage"
import Cookies from "js-cookie"
import { getContentType } from "../api"

export const AuthService = {
  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/login"),
      { email, password }
    )

    if (response.data.accessToken) {
      saveToLocalStorage(response.data)
    }

    return response.data
  },

  async register(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/register"),
      { email, password }
    )

    if (response.data.accessToken) {
      saveToLocalStorage(response.data)
      await this.login(email, password)
    }

    return response.data
  },
  async logout() {
    clearStorage()
  },

  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken")
    const user = getStoreLocal("user")

    const response = await axiosClassic.post<ITokens>(
      getAuthUrl("/login/refresh-token"),
      { refreshToken },
      { headers: getContentType() }
    )

    if (response.data.accessToken && refreshToken) {
      const data = {
        ...user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
      saveToLocalStorage(data)

      return data
    }

    return null
  },
}
