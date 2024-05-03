import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/models/user.model'
import { AuthDTO, RefreshTokenDTO } from './dto'
import { hash, genSalt, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDTO) {
		const user = await this.validateUser(dto)
		const tokens = await this.createTokenPair(user._id.toString())

		return {
			user: this.returnUserFileds(user),
			...tokens,
		}
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
		await newUser.save()

		const tokens = await this.createTokenPair(newUser._id.toString())

		return {
			user: this.returnUserFileds(newUser),
			...tokens,
		}
	}

	async createTokenPair(userId: string) {
		const payload = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '15d',
		})
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '1h',
		})

		return { accessToken, refreshToken }
	}

	returnUserFileds(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDTO) {
		if (!refreshToken) {
			throw new UnauthorizedException('Please sign in')
		}

		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid token or expired')
		}

		const user = await this.userModel.findById(result._id)
		if (!user) {
			throw new UnauthorizedException('Invalid token or expired')
		}

		return await this.createTokenPair(user._id.toString())
	}
}
