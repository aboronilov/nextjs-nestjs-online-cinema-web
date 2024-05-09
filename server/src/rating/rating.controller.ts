import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SetRatingDto } from './dto/set-rating.dto'
import { User } from 'src/user/decorators/user.decorator'
import { IdValidationPipe } from 'lib/pipes/id.validation.pipe'

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Get(':movieId')
	// @UsePipes(new ValidationPipe())
	@Auth()
	async getMovieValueByUser(
		@Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
		@User('_id') userId: Types.ObjectId
	) {
		return this.ratingService.getMovieValueByUser(movieId, userId)
	}

	@Post('set-rating')
	@Auth()
	@UsePipes(new ValidationPipe())
	async setRating(
		@User('_id') userId: Types.ObjectId,
		@Body() dto: SetRatingDto
	) {
		return this.ratingService.setRating(userId, dto)
	}
}
