import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/models/actor.model'
import { GenreModel } from 'src/genre/models/genre.model'

export interface MovieModel extends Base {}

export class MovieModelParameters {
	@prop()
	year: number

	@prop()
	duration: number

	@prop()
	country: string
}

export class MovieModel extends TimeStamps {
	@prop({ unique: true })
	postrer: string

	@prop()
	bigPoster: string

	@prop({ unique: true })
	title: string

	@prop({ unique: true })
	description: string

	@prop({ unique: true })
	slug: string

	@prop({ unique: true })
	parameters?: MovieModelParameters

	@prop({ default: 4.0 })
	rating?: number

	@prop({ unique: true })
	videoUrl: string

	@prop({ default: 0 })
	countOpened?: number

	@prop({ ref: () => GenreModel })
	genres: Ref<GenreModel>[]

	@prop({ ref: () => ActorModel })
	actors: Ref<ActorModel>[]

	@prop({ default: false })
	isSendTelegram: boolean
}
