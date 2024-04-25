import { IsOptional, IsEnum } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { PagingQueryDto } from '@/common/dto'
import { Status } from '@/common/enums'
import { MenuType } from '../menus.type'

export class QueryMenusDto extends PartialType(PagingQueryDto) {
	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@IsOptional()
	@IsEnum(MenuType)
	type?: MenuType
}
