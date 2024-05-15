import { GenreService } from "@/services/genre.service"
import { useQuery } from "react-query"
import { IMenuItem } from "../menu.interface"
import { getGenreUrl } from "@/config/url.config"

export const usePopularGenres = () => {
  const queryData = useQuery(
    "pupular genre menu",
    () => GenreService.getPopularGenres(),
    {
      select: ({ data }) =>
        data
          .map(
            (genre) =>
              ({
                icon: genre.icon,
                title: genre.name,
                link: getGenreUrl(genre.slug),
              }) as IMenuItem
          )
          .splice(0, 4),
    }
  )

  return queryData
}
