import { IsOptional, IsArray, IsEnum, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PaginateDto } from '@/common/dto'
import { Status, Gender } from '@/common/enums'

export class QueryUsersDto extends PartialType(PaginateDto) {
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
