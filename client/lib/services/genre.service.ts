import { getGenresUrl } from "@/config/api.config"
import { IGenre } from "@/shared/types/movie.types"
import { axiosClassic } from "api/interceptors"

export const GenreService = {
  async getPopularGenres() {
    return axiosClassic.get<IGenre[]>(getGenresUrl("/popular"))
  },
}
