import { IsOptional, IsEnum } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PaginateDto } from '@/common/dto'
import { Status } from '@/common/enums'

export class QueryRolesDto extends PartialType(PaginateDto) {
	@IsOptional()
	@IsEnum(Status)
	status?: Status
}
