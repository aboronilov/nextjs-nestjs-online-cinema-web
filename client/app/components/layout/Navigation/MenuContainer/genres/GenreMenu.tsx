"use client"

import { FC } from "react"
import { usePopularGenres } from "./usePupularGenres"
import Menu from "../Menu"
import { IMenu } from "../menu.interface"
import SkeletonLoader from "@/components/ui/SkeletonLoader"

const GenreMenu: FC = () => {
  const { isLoading, data } = usePopularGenres()

  if (isLoading) {
    return <div className="mx-11 mb-6">
      <SkeletonLoader className="h-7 mt-6" count={5} />
    </div>
  }

  const genresMenu: IMenu = {
    title: "Popular genres",
    items: data || [],
  }

  return <Menu menu={genresMenu} />
}

export default GenreMenu
