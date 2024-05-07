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
import { GenreService } from './genre.service'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { UpdateGenreDTO } from './dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async getGenreBySlug(@Param('slug') slug: string) {
		return this.genreService.getGenreBySlug(slug)
	}

	@Get()
	async getGenres(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getGenres(searchTerm)
	}

	@Get('collections')
	async getCollections() {
		return this.genreService.getCollections()
	}

	@Get(':id')
	async getGenreById(@Param('id', IdValidationPipe) _id: string) {
		return this.genreService.getGenreById(_id)
	}

	@Patch(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateGenre(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: UpdateGenreDTO
	) {
		return this.genreService.updateGenre(_id, dto)
	}

	@Post()
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	async createGenre() {
		return this.genreService.createGenre()
	}

	@Delete(':id')
	@Auth('admin')
	async deleteGenre(@Param('id', IdValidationPipe) _id: string) {
		return this.genreService.deleteGenre(_id)
	}
}
