"use client"

import { UserService } from "@/services/user.service"
import { useQuery } from "react-query"

export const useFavorites = async () => {
  const {
    isLoading,
    data: favoritesMovies,
    refetch,
  } = useQuery("Favorite movies", () => UserService.getFavorites(), {
    select: ({ data }) => data,
  })

  return { isLoading, favoritesMovies, refetch }
}
