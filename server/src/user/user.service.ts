import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './models/user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { AuthService } from 'src/auth/auth.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { genSalt, hash } from 'bcryptjs'

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
		return this.authService.returnUserFileds(user)
	}

	async updateProfile(_id: string, dto: UpdateUserDTO) {
		const user = await this.userModel.findById(_id)
		if (!user) {
			throw new NotFoundException('User not found')
		}

		if (dto.email) {
			const isEmailBusy = await this.userModel.findOne({ email: dto.email })
			if (isEmailBusy && isEmailBusy._id.toString() !== _id) {
				throw new NotFoundException('Email is busy')
			}

			user.email = dto.email
		}

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin
		}

		await user.save()

		return this.authService.returnUserFileds(user)
	}

	async getUsersCount() {
		return await this.userModel.countDocuments()
	}

	async getUsers(searchTerm?: string) {
		let options = {}
		if (searchTerm) {
			options = {
				$or: [
					{
						email: {
							$regex: searchTerm,
							$options: 'i',
						},
					},
				],
			}
		}
		return await this.userModel
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
	}

	async deleteUser(_id: string) {
		await this.userModel.findByIdAndDelete(_id)

		return { message: 'User deleted' }
	}
}
