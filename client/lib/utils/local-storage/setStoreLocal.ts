import { IAuthResponse, ITokens } from "@/store/user/user.interface"
import Cookies from "js-cookie"

export const setTokentToStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken)
  Cookies.set("refreshToken", data.refreshToken)
}

export const clearStorage = () => {
  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
  localStorage.removeItem("user")
}

export const saveToLocalStorage = (data: IAuthResponse) => {
  setTokentToStorage(data)
  localStorage.setItem("user", JSON.stringify(data.user))
}
