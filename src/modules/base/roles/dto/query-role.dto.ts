import { IsOptional, IsEnum } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PagingQueryDto } from '@/common/dto'
import { Status } from '@/common/enums'

export class QueryRolesDto extends PartialType(PagingQueryDto) {
	@IsOptional()
	@IsEnum(Status)
	status?: Status
}
