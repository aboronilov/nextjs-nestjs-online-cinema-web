import { getGenresUrl } from "@/config/api.config"
import { IGenre } from "@/shared/types/movie.types"
import { axiosClassic, instance } from "@/api/interceptors"
import { IGenreEditInput } from "@/components/screens/admin/genres/edit/genre-edit.interface"

export const GenreService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenresUrl(""), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    })
  },

  async getById(_id: string) {
    return instance.get<IGenre>(getGenresUrl(`/${_id}`))
  },

  async deleteGenre(_id: string) {
    return instance.delete<{ [key: string]: string }>(getGenresUrl(`/${_id}`))
  },

  async updateGenre(_id: string, data: IGenreEditInput) {
    return instance.patch<IGenre>(getGenresUrl(`/${_id}`), data)
  },
}
