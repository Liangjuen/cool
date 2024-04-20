import {
	IsNotEmpty,
	IsString,
	IsNumber,
	Length,
	IsEmail,
	IsPhoneNumber,
	IsArray,
	IsInstance,
	IsEnum,
	MaxLength,
	ArrayMaxSize
} from 'class-validator'
import {} from 'class-transformer'
import { Status, Gender, ROLE } from '@/common/enums'

export class CreateUserDto {
	@IsNotEmpty({ message: '用户名不能为空' })
	@Length(3, 16, { message: '用户名长度在 3 - 16 之间' })
	@IsString()
	username: string

	@IsNumber()
	departmentId: number

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
	@IsInstance(String)
	roles: Array<string>

	@IsEnum(Status, { message: '状态: 0-禁用,1-正常' })
	status: Status

	@IsEnum(Status, { message: '性别: 0-女,1-男,2-X' })
	gender: Gender

	@IsArray()
	@ArrayMaxSize(10, { message: '标签数量超过最大限制: 10' })
	@IsInstance(String)
	tags: Array<string>

	@IsString()
	@MaxLength(100, { message: '用户头像地址超过最大长度限制: 100' })
	avatar: string

	@IsString()
	@MaxLength(300, { message: '用户个人描述地址超过最大长度限制: 300' })
	remark: string
}

// export class CreateUserDto {}
