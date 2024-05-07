import { IsString } from 'class-validator'

export class CreateActorDTO {
	@IsString()
	name: string

	@IsString()
	bio: string

	@IsString()
	slug: string

	@IsString()
	photo: string
}
