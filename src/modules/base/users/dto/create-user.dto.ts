import {
	IsNotEmpty,
	IsString,
	Length,
	IsEmail,
	IsArray,
	IsEnum,
	IsInt,
	IsOptional,
	MaxLength,
	ArrayMaxSize
} from 'class-validator'
import { IsPhoneNumber } from '@/common/validation'
import { Status, Gender } from '@/common/enums'

export class CreateUserDto {
	@IsNotEmpty({ message: '用户名不能为空' })
	@Length(3, 16, { message: '用户名长度在 3 - 16 之间' })
	@IsString({ message: '用户名为[string]类型' })
	username: string

	@IsOptional()
	@IsInt()
	departmentId?: number

	@Length(3, 20, { message: '昵称长度在 3 - 20 之间' })
	@IsString()
	nickname: string

	@IsNotEmpty({ message: '用户名不能为空' })
	@Length(6, 20, { message: '密码长度在 6 - 20 之间' })
	@IsString()
	password: string

	@IsNotEmpty({ message: '邮箱不能为空' })
	@IsEmail()
	email: string

	@IsNotEmpty({ message: '手机号不能为空' })
	@IsPhoneNumber()
	phone: string

	@IsArray()
	@ArrayMaxSize(10, { message: '用户角色数量超过最大限制: 10' })
	roles: Array<string>

	@IsEnum(Status, { message: '状态: 0-禁用,1-正常' })
	status: Status

	@IsEnum(Gender, { message: '性别: 0-女 1-男 2-X' })
	gender: Gender

	@IsOptional()
	@IsArray()
	@ArrayMaxSize(10, { message: '标签数量超过最大限制: 10' })
	tags?: Array<string>

	@IsOptional()
	@IsString()
	@MaxLength(100, { message: '用户头像地址超过最大长度限制: 100' })
	avatar?: string

	@IsOptional()
	@IsString()
	@MaxLength(300, { message: '用户个人描述地址超过最大长度限制: 300' })
	remark?: string
}
