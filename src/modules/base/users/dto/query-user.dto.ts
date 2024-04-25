import { IsOptional, IsArray, IsEnum, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PagingQueryDto } from '@/common/dto'
import { Status, Gender } from '@/common/enums'

export class QueryUsersDto extends PartialType(PagingQueryDto) {
	@IsOptional()
	@IsInt({ each: true })
	departmentIds?: number[]

	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender
}
