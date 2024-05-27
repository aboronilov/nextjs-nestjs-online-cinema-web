import { instance } from "@/api/interceptors"
import { getUserUrl } from "@/config/api.config"

export const AdminService = {
  async getCountUsers() {
    return instance.get<number>(getUserUrl("/count"))
  },
}
