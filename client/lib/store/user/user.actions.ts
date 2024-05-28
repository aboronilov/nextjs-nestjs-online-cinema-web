import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAuthResponse } from "./user.interface"
import { IEmailPassword } from "@/shared/types/user.types"
import { AuthService } from "@/services/auth.service"
import { toastr } from "react-redux-toastr"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { errorCatch } from "@/api/api.helpers"

// Register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/register",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.register(email, password)
      toastr.success("Resiter User", "Completed successfully")
      return response
    } catch (error) {
      toastErrors(error, "Register failed")
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password)
      toastr.success("Login User", "Completed successfully")
      return response
    } catch (error) {
      toastErrors(error, "Login failed")
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await AuthService.logout()
    toastr.success("Logout User", "Completed successfully")
  } catch (error) {
    toastErrors(error, "Logout failed")
    return thunkApi.rejectWithValue(error)
  }
})

// Check Auth
export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      const response =
        (await AuthService.getNewTokens()) as unknown as IAuthResponse
      return response
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        toastErrors("Your authentication is expired, please sign in", "Logout")
        thunkApi.dispatch(logout())
      }

      return thunkApi.rejectWithValue(error)
    }
  }
)
