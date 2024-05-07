import { PartialType } from '@nestjs/mapped-types'
import { CreateActorDTO } from './create-actor.dto'

export class UpdateActorDTO extends PartialType(CreateActorDTO) {}
