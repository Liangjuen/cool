import { IsOptional, IsEnum } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PaginateDto } from '@/common/dto'
import { Status } from '@/common/enums'
import { MenuType } from '../menus.type'

export class QueryMenusDto extends PartialType(PaginateDto) {
	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@IsOptional()
	@IsEnum(MenuType)
	type?: MenuType
}
