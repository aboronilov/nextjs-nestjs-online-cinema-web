import { IOption } from "@/components/ui/select/select.interface"
import { GenreService } from "@/services/genre.service"
import { toastErrors } from "@/utils/toast-error/toastErrors"
import { useQuery } from "react-query"

export const useAdminGenres = () => {
  const queryData = useQuery(
    "Genres for editing movie",
    () => GenreService.getAll(),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            value: item._id,
            label: item.name,
          })
        ),
      onError: (error) => {
        toastErrors(error, "Genres for editing movie")
      },
    }
  )

  return queryData
}
