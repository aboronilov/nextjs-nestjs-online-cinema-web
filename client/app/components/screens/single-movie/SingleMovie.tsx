import Banner from "@/components/ui/banner/Banner"
import Gallery from "@/components/ui/gallery/Gallery"
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface"
import SubHeading from "@/components/ui/heading/Subheading"
import { getMovieUrl } from "@/config/url.config"
import { IMovie } from "@/shared/types/movie.types"
import { FC } from "react"
import Content from "./Content/Content"
import VideoPlayer from "@/components/ui/video-player/VideoPlayer"

interface ISingleMoviePage {
  movie: IMovie
  similarMovies: IMovie[]
}

const SingleMovie: FC<ISingleMoviePage> = ({ movie, similarMovies }) => {
  const galleryItems: IGalleryItem[] = similarMovies.map((item) => ({
    name: item.title,
    posterPath: `/uploads/movies/${item.slug}/poster.webp`,
    link: getMovieUrl(item.slug),
  }))

  return (
    <div>
      <Banner
        image={movie.bigPoster}
        Details={() => <Content movie={movie} />}
      />

      <VideoPlayer slug={movie.slug} videoSource={movie.videoUrl} />

      <div className="mt-12">
        <SubHeading title="Similar" />
        <Gallery items={galleryItems} />
      </div>

      {/* Rating */}
    </div>
  )
}

export default SingleMovie
