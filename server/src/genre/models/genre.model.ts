import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
	@prop({ unique: true })
	name: string

	@prop({ unique: true })
	slug: string

	@prop({ unique: true })
	description: string

	@prop({ unique: true })
	icon: string
}
