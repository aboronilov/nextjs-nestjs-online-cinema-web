import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from './models/movie.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateMovieDTO, UpdateMovieDTO } from './dto'
import { Types } from 'mongoose'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: ModelType<MovieModel>
	) {}

	async getMovieBySlug(slug: string) {
		const movie = await this.movieModel
			.findOne({ slug })
			.populate('actors genres')
		if (!movie) {
			throw new NotFoundException('movie not found')
		}

		return movie
	}

	async getMovieByActor(actorId: Types.ObjectId) {
		const movies = await this.movieModel.find({ actors: actorId })
		if (!movies) {
			throw new NotFoundException('movies not found')
		}

		return movies
	}

	async getMovieByGenres(genreIds: Types.ObjectId[]) {
		const movies = await this.movieModel
			.find({ genres: { $in: genreIds } })
			.exec()
		if (!movies) {
			throw new NotFoundException('movies not found')
		}

		return movies
	}

	async updateCountOpened(slug: string) {
		const movie = await this.movieModel.findOneAndUpdate(
			{ slug },
			{
				$inc: { countOpened: 1 },
			},
			{ new: true }
		)
		if (!movie) {
			throw new NotFoundException('movie not found')
		}

		return movie
	}

	async getMovies(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		// aggregation

		return await this.movieModel
			.find(options)
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec()
	}

	async getMostPopular() {
		const movies = await this.movieModel
			.find()
			.sort({ countOpened: 'desc' })
			.limit(10)
			.populate('genres')
			.exec()
		if (!movies) {
			throw new NotFoundException('movies not found')
		}

		return movies
	}

	async updateRating(_id: Types.ObjectId, newRating: number) {
		return await this.movieModel
			.findByIdAndUpdate({ _id }, { rating: newRating }, { new: true })
			.exec()
	}

	// ADMIN

	async getMovieById(_id: string) {
		const movie = await this.movieModel.findById(_id)
		if (!movie) {
			throw new NotFoundException('movie not found')
		}

		return movie
	}

	async updateMovie(_id: string, dto: UpdateMovieDTO) {
		// telegram
		const movie = await this.movieModel
			.findByIdAndUpdate(_id, dto, { new: true })
			.exec()
		if (!movie) {
			throw new NotFoundException('movie not found')
		}

		return movie
	}

	async createMovie() {
		// const defaultParameters = {
		// 	year: 2024,
		// 	duration: 90,
		// 	country: 'USA',
		// }
		const defaultValue: CreateMovieDTO = {
			postrer: '',
			bigPoster: '',
			title: '',
			description: '',
			slug: '',
			// parameters: defaultParameters,
			videoUrl: '',
			genres: [],
			actors: [],
			isSendTelegram: false,
		}

		const movie = await this.movieModel.create(defaultValue)

		return movie._id
	}

	async deleteMovie(_id: string) {
		const { slug } = await this.getMovieById(_id)
		await this.movieModel.findByIdAndDelete(_id)
		return { message: `movie ${slug} deleted` }
	}
}
