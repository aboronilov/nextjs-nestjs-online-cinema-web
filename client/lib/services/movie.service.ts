import { axiosClassic, instance } from "@/api/interceptors"
import { IMovieEditInput } from "@/components/screens/admin/movies/edit/movie-edit.interface"
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

  async getById(_id: string) {
    return instance.get<IMovie>(getMovieUrl(`${_id}`))
  },

  async create() {
    return instance.post<string>(getMovieUrl(`/`))
  },

  async getMostPopularMovies() {
    return axiosClassic.get<IMovie[]>(getMovieUrl("most-popular"))
  },

  async deleteMovie(_id: string) {
    return instance.delete<{ [key: string]: string }>(getMovieUrl(`${_id}`))
  },

  async update(_id: string, data: IMovieEditInput) {
    return instance.patch<IMovie>(getMovieUrl(`${_id}`), data)
  },
}
