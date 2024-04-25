import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsArray } from 'class-validator'
import { IsRemark } from '@/common/validation'
import { Status } from '@/common/enums'

export class CreateRoleDto {
	@IsNotEmpty({ message: '角色名称为必填项' })
	@IsString()
	name: string

	@IsNotEmpty({ message: '角色编码为必填项' })
	@IsString()
	code: string

	@IsNotEmpty({ message: '菜单ID集合为必选项' })
	@IsInt({ each: true })
	menuIdList: number[]

	@IsNotEmpty({ message: '权限标识为必选项' })
	@IsArray()
	@IsString({ each: true })
	perms: string[]

	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@IsOptional()
	@IsString()
	@IsRemark()
	remark?: string
}
