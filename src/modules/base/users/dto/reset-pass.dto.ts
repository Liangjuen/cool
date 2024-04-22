import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ResetPasswordDto {
	@IsNotEmpty({ message: '密码为必填项' })
	@Length(6, 20, { message: '密码长度在 6 - 20 之间' })
	@IsString()
	password: string
}
