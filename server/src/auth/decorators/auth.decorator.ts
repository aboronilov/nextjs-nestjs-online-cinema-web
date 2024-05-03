import { UseGuards, applyDecorators } from '@nestjs/common'
import { TypeRole } from '../auth.interface'
import { JWTAuthGuard, OnlyAdminGuard } from '../guards'

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JWTAuthGuard, OnlyAdminGuard)
			: UseGuards(JWTAuthGuard)
	)
