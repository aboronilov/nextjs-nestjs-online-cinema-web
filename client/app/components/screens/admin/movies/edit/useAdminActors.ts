import { IOption } from "@/components/ui/select/select.interface"
import { ActorService } from "@/services/actor.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { useQuery } from "react-query"

export const useAdminActors = () => {
  const queryData = useQuery(
    "Actors for editing movie",
    () => ActorService.getAll(),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            value: item._id,
            label: item.name,
          })
        ),
      onError: (error) => {
        toastErrors(error, "Actors for editing movie")
      },
    }
  )

  return queryData
}
