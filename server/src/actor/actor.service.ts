import { Injectable, NotFoundException } from '@nestjs/common'
import { ActorModel } from './models/actor.model'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateActorDTO, UpdateActorDTO } from './dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel)
		private readonly actorModel: ModelType<ActorModel>
	) {}

	async getActorBySlug(slug: string) {
		const actor = await this.actorModel.findOne({ slug })
		if (!actor) {
			throw new NotFoundException('Actor not found')
		}

		return actor
	}

	async getActors(searchTerm?: string) {
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
						bio: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		// aggregation

		return await this.actorModel
			.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'movies',
			})
			.addFields({
				countMovies: {
					$size: '$movies',
				},
			})
			.project({
				__v: 0,
				updatedAt: 0,
				movies: 0,
			})
			.sort({ createdAt: -1 })
			.exec()
	}

	async getActorById(_id: string) {
		const actor = await this.actorModel.findById(_id)
		if (!actor) {
			throw new NotFoundException('Actor not found')
		}

		return actor
	}

	async updateActor(_id: string, dto: UpdateActorDTO) {
		const actor = await this.actorModel
			.findByIdAndUpdate(_id, dto, { new: true })
			.exec()
		if (!actor) {
			throw new NotFoundException('Actor not found')
		}

		return actor
	}

	async createActor() {
		const defaultValue: CreateActorDTO = {
			name: '',
			slug: '',
			bio: '',
			photo: '',
		}

		const actor = await this.actorModel.create(defaultValue)

		return actor._id
	}

	async deleteActor(_id: string) {
		const { slug } = await this.getActorById(_id)
		await this.actorModel.findByIdAndDelete(_id)
		return { message: `Actor ${slug} deleted` }
	}
}
