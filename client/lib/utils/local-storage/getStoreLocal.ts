import { IUser } from "@/shared/types/user.types"

export const getStoreLocal = (item: string): IUser | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(item)
    return user ? JSON.parse(user) : null
  }
  return null
}
