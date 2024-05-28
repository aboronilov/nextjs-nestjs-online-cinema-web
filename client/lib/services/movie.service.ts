import { axiosClassic, instance } from "@/api/interceptors"
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

  async getMostPopularMovies() {
    return axiosClassic.get<IMovie[]>(getMovieUrl("most-popular"))
  },

  async deleteMovie(_id: string) {
    return instance.delete<{ [key: string]: string }>(getMovieUrl(`${_id}`))
  },
}
