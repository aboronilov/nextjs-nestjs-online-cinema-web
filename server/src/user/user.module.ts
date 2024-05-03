import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './models/user.model'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
		AuthModule,
	],
})
export class UserModule {}
