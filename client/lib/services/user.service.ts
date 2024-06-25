import { instance } from "@/api/interceptors"
import { IProfileInput } from "@/components/screens/profile/profile.interface"
import { getUserUrl } from "@/config/url.config"
import { IMovie } from "@/shared/types/movie.types"
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

  async getProfile() {
    return instance.get<IUser>(getUserUrl("profile"))
  },

  async getFavorites() {
    return instance.get<IMovie[]>(getUserUrl("profile/favorites"))
  },

  async toggleFavorite(movieId: string) {
    return instance.patch(getUserUrl("profile/favorites"), {
      movieId,
    })
  },

  async updateProfile(data: IProfileInput) {
    return instance.patch<string>(getUserUrl("profile"), data)
  },

  async deleteUser(_id: string) {
    return instance.delete<{ [key: string]: string }>(getUserUrl(`${_id}`))
  },

  async getById(_id: string) {
    return instance.get<IUser>(getUserUrl(`${_id}`))
  },

  async updateUser(_id: string, data: IProfileInput) {
    return instance.patch<string>(getUserUrl(`${_id}`), data)
  },
}
