import { axiosClassic } from "@/api/interceptors"
import { getMovieUrl } from "@/config/url.config"
import { IMovie } from "@/shared/types/movie.types"

export const MovieService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IMovie[]>(getMovieUrl(""), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    })
  },
}
