import { GenreService } from "@/services/genre.service"
import { useQuery } from "react-query"
import { IMenuItem } from "../menu.interface"
import { getGenreUrl } from "@/config/url.config"
import { getRandomItems } from "@/utils/array/getRandomItems"

export const usePopularGenres = () => {
  const queryData = useQuery(
    "pupular genre menu",
    () => GenreService.getAll(),
    {
      select: ({ data }) => {
        const filtered = data.filter((item) => item.icon)
        const random = getRandomItems(filtered, 4)
        return random.map(
          (genre) =>
            ({
              icon: genre.icon,
              title: genre.name,
              link: getGenreUrl(genre.slug),
            }) as IMenuItem
        )
      },
    }
  )

  return queryData
}
