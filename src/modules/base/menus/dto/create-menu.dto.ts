import { IsOptional, IsNotEmpty, IsString, IsInt, Length, IsEnum } from 'class-validator'
import { MenuCache, MenuHidden, MenuType } from '../menus.type'
import { Status } from '@/common/enums'

export class CreateMenuDto {
	@IsNotEmpty({ message: '菜单名不能为空' })
	@IsString()
	@Length(2, 8, { message: '菜单名长度限制为 2 - 8 位' })
	name: string

	@IsNotEmpty({ message: '菜单类型为必填项' })
	@IsEnum(MenuType, { message: '菜单类型错误 1-目录 2-菜单 3-权限' })
	type: MenuType

	@IsOptional()
	@IsString({ each: true })
	@Length(1, 100, { each: true })
	perms?: string[]

	@IsOptional()
	@IsInt()
	pid?: number

	@IsOptional()
	@IsString()
	path?: string

	@IsOptional()
	@IsString()
	component?: string

	@IsOptional()
	@IsString()
	icon?: string

	@IsOptional()
	@IsInt()
	sort?: number

	@IsOptional()
	@IsEnum(MenuCache)
	cache?: MenuCache

	@IsOptional()
	@IsEnum(MenuCache)
	hidden?: MenuHidden

	@IsOptional()
	@IsEnum(Status)
	status?: Status
}
