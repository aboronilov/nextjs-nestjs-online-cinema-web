import { IAuthResponse, ITokens } from "@/store/user/user.interface"
import Cookies from "js-cookie"

export const setTokentToStorage = (data: ITokens) => {
  // cookies().set({
  //   name: "accessToken",
  //   value: data.accessToken,
  //   httpOnly: true,
  //   path: "/",
  // })
  // cookies().set({
  //   name: "refreshToken",
  //   value: data.refreshToken,
  //   httpOnly: true,
  //   path: "/",
  // })
  Cookies.set("accessToken", data.accessToken)
  Cookies.set("refreshToken", data.refreshToken)
}

export const clearStorage = () => {
  // cookies().delete("accessToken")
  // cookies().delete("refreshToken")
  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
  localStorage.removeItem("user")
}

export const saveToLocalStorage = (data: IAuthResponse) => {
  setTokentToStorage(data)
  localStorage.setItem("user", JSON.stringify(data.user))
}
