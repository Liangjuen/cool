import { PartialType } from '@nestjs/mapped-types'
import { CreateDictTypeDto } from './create-type.dto'

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {}
