import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

/**
 * 邮箱服务
 */
export class Mailer {
	@IsNotEmpty()
	@IsString()
	host: string

	@IsNotEmpty()
	@IsNumber()
	port: number

	@IsNotEmpty()
	@IsString()
	user: string

	@IsNotEmpty()
	@IsString()
	pass: string
}
