import { axiosClassic, instance } from "@/api/interceptors"
import { IActorEditInput } from "@/components/screens/admin/actors/edit/actor-edit.interface"
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

  async getById(_id: string) {
    return instance.get<IActor>(getActorUrl(``))
  },

  async create() {
    return instance.post<string>(getActorUrl(``))
  },

  async deleteActor(_id: string) {
    return instance.delete<{ [key: string]: string }>(getActorUrl(`${_id}`))
  },

  async update(_id: string, data: IActorEditInput) {
    return instance.patch<IActor>(getActorUrl(`${_id}`), data)
  },
}
