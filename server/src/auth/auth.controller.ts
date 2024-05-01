import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDTO } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async register(@Body() dto: AuthDTO) {
		return this.authService.register(dto)
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: AuthDTO) {
		return this.authService.login(dto)
	}
}
