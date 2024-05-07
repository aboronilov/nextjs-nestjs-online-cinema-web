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
import { ActorService } from './actor.service'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { UpdateActorDTO } from './dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('actor')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	async getActorBySlug(@Param('slug') slug: string) {
		return this.actorService.getActorBySlug(slug)
	}

	@Get()
	async getActors(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getActors(searchTerm)
	}

	@Get(':id')
	async getActorById(@Param('id', IdValidationPipe) _id: string) {
		return this.actorService.getActorById(_id)
	}

	@Patch(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateActor(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: UpdateActorDTO
	) {
		return this.actorService.updateActor(_id, dto)
	}

	@Post()
	@Auth('admin')
	async createActor() {
		return this.actorService.createActor()
	}

	@Delete(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async deleteActor(@Param('id', IdValidationPipe) _id: string) {
		return this.actorService.deleteActor(_id)
	}
}
