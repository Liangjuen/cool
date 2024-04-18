import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

/**
 * 数据库配置
 */
export class Database {
	@IsNotEmpty()
	@IsString()
	type: ENV.DatabaseType

	@IsString()
	host: string

	@IsNumber()
	port: number

	@IsNotEmpty()
	@IsString()
	username: string

	@IsNotEmpty()
	@IsString()
	password: string

	@IsNotEmpty()
	@IsString()
	database: string
}
