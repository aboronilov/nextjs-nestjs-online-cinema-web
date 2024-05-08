import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { UpdateUserDTO } from './dto/update-user.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { Types } from 'mongoose'
import { UserModel } from './models/user.model'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.userService.getProfile(_id)
	}

	@Patch('profile')
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDTO) {
		return this.userService.updateProfile(_id, dto)
	}

	@Get('profile/favorites')
	@UsePipes(new ValidationPipe())
	@Auth()
	async getFavorites(@User('_id', IdValidationPipe) _id: Types.ObjectId) {
		return this.userService.getFavorites(_id)
	}

	@Patch('profile/favorites')
	@Auth()
	@HttpCode(HttpStatus.OK)
	async toggleFavorites(
		@User() user: UserModel,
		@Body('movieId', IdValidationPipe) movieId: Types.ObjectId
	) {
		return this.userService.toggleFavorite(movieId, user)
	}

	@Patch(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async updateUser(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: UpdateUserDTO
	) {
		return this.userService.updateProfile(_id, dto)
	}

	@Get('count')
	@Auth('admin')
	async getUsersCount() {
		return this.userService.getUsersCount()
	}

	@Get()
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getUsers(searchTerm)
	}

	@Delete(':id')
	@Auth('admin')
	async deleteUser(@Param('id', IdValidationPipe) _id: string) {
		return this.userService.deleteUser(_id)
	}

	@Get(':id')
	@Auth('admin')
	async retrieveUser(@Param('id', IdValidationPipe) _id: string) {
		return this.userService.getProfile(_id)
	}
}
