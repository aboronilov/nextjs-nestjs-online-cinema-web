import { AuthDTO } from 'src/auth/dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserDTO extends PartialType(AuthDTO) {}
