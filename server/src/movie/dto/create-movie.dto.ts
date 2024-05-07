import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from 'class-validator'

export class Parameters {
	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsString()
	country: string
}

export class CreateMovieDTO {
	@IsString()
	postrer: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	slug: string

	@IsObject()
	parameters?: Parameters

	@IsString()
	videoUrl: string

	@IsOptional()
	@IsNumber()
	countOpened?: number

	@IsArray()
	@IsString({ each: true })
	genres: string[]

	@IsArray()
	@IsString({ each: true })
	actors: string[]

	@IsOptional()
	@IsBoolean()
	isSendTelegram?: boolean
}
