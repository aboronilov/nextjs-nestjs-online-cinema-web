import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/models/user.model'
import { AuthDTO } from './dto'
import { hash, genSalt, compare } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async login(dto: AuthDTO) {
		return await this.validateUser(dto)
	}

	async validateUser(dto: AuthDTO) {
		const user = await this.userModel.findOne({ email: dto.email })
		if (!user) {
			throw new UnauthorizedException('Wrong credentials')
		}

		const isValid = await compare(dto.password, user.password)
		if (!isValid) {
			throw new UnauthorizedException('Wrong credentials')
		}

		return user
	}

	async register(dto: AuthDTO) {
		const userExists = await this.userModel.findOne({ email: dto.email })
		if (userExists) {
			throw new BadRequestException('User already exists')
		}

		const salt = await genSalt(10)
		const passwordHash = await hash(dto.password, salt)

		const newUser = new this.userModel({
			email: dto.email,
			password: passwordHash,
		})

		return await newUser.save()
	}
}
