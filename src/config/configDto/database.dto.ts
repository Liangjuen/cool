import { DataSourceOptions } from 'typeorm'
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

interface DatabaseOptions extends Pick<DataSourceOptions, 'database' | 'name' | 'synchronize'> {}

/**
 * 数据库配置
 */
export class Database implements DatabaseOptions {
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

	@IsOptional()
	@Transform(target => !!target.value)
	synchronize: boolean
}
