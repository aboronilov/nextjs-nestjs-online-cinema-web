import { instance, axiosClassic } from "@/api/interceptors"

import { getRatingsUrl } from "@/config/api.config"

export const RatingService = {
  async setRating(movieId: string, value: number) {
    return instance.post<string>(getRatingsUrl("/set-rating"), {
      movieId,
      value,
    })
  },

  async getByUserMovie(movieId: string) {
    return instance.get<number>(getRatingsUrl(`/${movieId}`))
  },
}
