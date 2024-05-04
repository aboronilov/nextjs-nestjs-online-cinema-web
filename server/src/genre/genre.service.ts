import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { GenreModel } from './models/genre.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateGenreDTO, UpdateGenreDTO } from './dto'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>
	) {}
	async getGenreBySlug(slug: string) {
		const genre = await this.genreModel.findOne({ slug })
		if (!genre) {
			throw new NotFoundException('Genre not found')
		}

		return genre
	}

	async getGenres(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return await this.genreModel
			.find(options)
			.sort({ createdAt: 'desc' })
			.select('-password -updatedAt -__v')
			.exec()
	}

	async getCollections() {
		const genres = await this.getGenres()
		const collections = genres

		return collections
	}

	// Admin Panel

	async getGenreById(_id: string) {
		const genre = await this.genreModel.findById(_id)
		if (!genre) {
			throw new NotFoundException('Genre not found')
		}

		return genre
	}

	async updateGenre(_id: string, dto: UpdateGenreDTO) {
		const genre = await this.genreModel
			.findByIdAndUpdate(_id, dto, { new: true })
			.exec()
		if (!genre) {
			throw new NotFoundException('Genre not found')
		}

		return genre
	}

	async createGenre() {
		const defaultValue: CreateGenreDTO = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}

		const genre = await this.genreModel.create(defaultValue)

		return genre._id
	}

	async deleteGenre(_id: string) {
		const { slug } = await this.getGenreById(_id)
		await this.genreModel.findByIdAndDelete(_id)
		return { message: `Genre ${slug} deleted` }
	}
}
