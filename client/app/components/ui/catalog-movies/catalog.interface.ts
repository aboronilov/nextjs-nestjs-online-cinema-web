import { IMovie } from "@/shared/types/movie.types"

export interface ICatalog {
  title: string
  description?: string
  movies: IMovie[]
  imageUrl?: string
  isCollection?: boolean
}
