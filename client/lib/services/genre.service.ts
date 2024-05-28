import { getGenresUrl } from "@/config/api.config"
import { IGenre } from "@/shared/types/movie.types"
import { axiosClassic, instance } from "@/api/interceptors"

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

  async deleteGenre(_id: string) {
    return instance.delete<{ [key: string]: string }>(getGenresUrl(`${_id}`))
  },
}
