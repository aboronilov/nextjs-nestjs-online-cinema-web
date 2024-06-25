import { API_URL } from "@/api/index"
import Collections from "@/components/screens/collections/Collections"
import { ICollection } from "@/components/screens/collections/collections.interface"
import Catalog from "@/components/ui/catalog-movies/Catalog"
import { getGenreUrl, getMovieUrl } from "@/config/url.config"
import { removeTrailingSlash } from "@/utils/string/clearText"
import { NextPage } from "next"

async function fetchGenresCollections() {
  const url = `${removeTrailingSlash(API_URL)}${getGenreUrl("collections")}`
  const res = await fetch(url, { cache: "force-cache" })
  const collections = (await res.json()) as ICollection[]

  return collections
}

const GenresPage: NextPage = async () => {
  const collections = await fetchGenresCollections()

  return (
    <Catalog
      movies={(collections as any) || []}
      title="Collections"
      description="In this section you can find movies cooections by genres"
      isCollection
    />
  )
}

export default GenresPage
