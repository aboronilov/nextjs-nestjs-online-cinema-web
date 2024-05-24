import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { errorCatch, getContentType } from "./api.helpers"
import Cookies from "js-cookie"
import { AuthService } from "@/services/auth.service"
import { clearStorage } from "@/utils/local-storage"

const BASE_URL = process.env.API_URL
const API_URL = `${BASE_URL}/api/`

const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
})

const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = Cookies.get("accessToken")

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

instance.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error) => {
    const originalRequest = error.config

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      !error.config._isRetry &&
      error.config
    ) {
      originalRequest._isRetry = true

      try {
        await AuthService.getNewTokens()
        return instance.request(originalRequest)
      } catch (e) {
        if (errorCatch(e) === "jwr expired") clearStorage()
      }
    }

    throw error
  }
)

export { axiosClassic, instance }
