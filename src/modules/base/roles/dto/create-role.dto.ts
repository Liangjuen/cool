import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsArray, Length } from 'class-validator'
import { IsRemark } from '@/common/validation'
import { Status } from '@/common/enums'

export class CreateRoleDto {
	@IsNotEmpty({ message: '角色名称为必填项' })
	@Length(2, 20, { message: '角色名长度在 2 - 20' })
	@IsString()
	name: string

	@IsNotEmpty({ message: '角色编码为必填项' })
	@Length(1, 20, { message: '角色编码长度在 1 - 20' })
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
