import { IsString, IsNotEmpty, Length } from 'class-validator'

export class LoginDto {
	@IsNotEmpty({ message: '用户名不能为空' })
	@Length(3, 16, { message: '用户名长度在 3 - 16 之间' })
	@IsString()
	username: string

	@IsNotEmpty({ message: '用户名不能为空' })
	@Length(6, 20, { message: '密码长度在 6 - 20 之间' })
	@IsString()
	password: string
}
