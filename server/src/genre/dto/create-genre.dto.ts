import { IsString } from 'class-validator'

export class CreateGenreDTO {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	description: string

	@IsString()
	icon: string
}
