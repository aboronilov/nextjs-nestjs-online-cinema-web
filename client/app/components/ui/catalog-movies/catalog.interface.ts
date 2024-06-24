import { IMovie } from "@/shared/types/movie.types"

export interface ICatalog {
  title: string
  description?: string
  imageUrl?: string
  movies: IMovie[]
}
