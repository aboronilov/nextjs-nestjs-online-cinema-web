import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { IdValidationPipe } from 'lib/pipes/id.validation.pipe'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateMovieDTO } from './dto'
import { Types } from 'mongoose'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('by-slug/:slug')
	async getMovieBySlug(@Param('slug') slug: string) {
		return this.movieService.getMovieBySlug(slug)
	}

	@Get('by-actor/:actorId')
	@UsePipes(new ValidationPipe())
	async getMovieByActor(
		@Param('actorId', IdValidationPipe) actorId: Types.ObjectId
	) {
		return this.movieService.getMovieByActor(actorId)
	}

	@Post('by-genres')
	@HttpCode(HttpStatus.OK)
	async getMovieByGenres(@Body('genreIds') genreIds: Types.ObjectId[]) {
		return this.movieService.getMovieByGenres(genreIds)
	}

	@Get()
	async getMovies(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getMovies(searchTerm)
	}

	@Get('most-popular')
	async getMostPupular() {
		return this.movieService.getMostPopular()
	}

	@Get('fresh')
	async getFreshMovies() {
		return this.movieService.getFreshMovies()
	}

	@Get(':id')
	async getMovieById(@Param('id', IdValidationPipe) _id: string) {
		return this.movieService.getMovieById(_id)
	}

	@Patch('update-count-opened')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.movieService.updateCountOpened(slug)
	}

	@Patch(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateMovie(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: UpdateMovieDTO
	) {
		return this.movieService.updateMovie(_id, dto)
	}

	@Post()
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	async createMovie() {
		return this.movieService.createMovie()
	}

	@Delete(':id')
	@Auth('admin')
	async deleteMovie(@Param('id', IdValidationPipe) _id: string) {
		return this.movieService.deleteMovie(_id)
	}
}
