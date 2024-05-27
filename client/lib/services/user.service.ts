import { instance } from "@/api/interceptors"
import { getUserUrl } from "@/config/url.config"
import { IUser } from "@/shared/types/user.types"

export const UserService = {
  async getAll(searchTerm?: string) {
    return instance.get<IUser[]>(getUserUrl(""), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    })
  },

  async deleteUser(_id: string) {
    return instance.delete<{ [key: string]: string }>(getUserUrl(`${_id}`))
  },
}
