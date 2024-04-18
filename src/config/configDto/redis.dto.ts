import { IsNumber, IsString, IsNotEmpty, Max, Min } from 'class-validator'

/**
 * redis 服务
 */
export class Redis {
	@IsString()
	@IsNotEmpty()
	host: string

	@IsNumber()
	@IsNotEmpty()
	port: number

	@IsString()
	@IsNotEmpty()
	username: string

	@IsNotEmpty()
	password: any

	@IsNumber()
	@Max(15)
	@Min(0)
	database: number
}
