import { axiosClassic, instance } from "@/api/interceptors"
import { getActorUrl } from "@/config/url.config"
import { IActor } from "@/shared/types/movie.types"

export const ActorService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IActor[]>(getActorUrl(""), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    })
  },

  async deleteActor(_id: string) {
    return instance.delete<{ [key: string]: string }>(getActorUrl(`${_id}`))
  },
}
