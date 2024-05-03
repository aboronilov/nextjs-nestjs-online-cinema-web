import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './models/user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly authService: AuthService
	) {}
	async getProfile(_id: string) {
		const user = await this.userModel.findById(_id)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return await this.authService.returnUserFileds(user)
	}
}
