import { IsNumber, IsString, IsNotEmpty, IsEnum } from 'class-validator'

enum Protocol {
	Http = 'http',
	Https = 'https'
}

/**
 * 应用程序
 */
export class App {
	@IsEnum(Protocol)
	protocol: Protocol

	@IsNumber()
	port: number

	@IsNotEmpty()
	@IsString()
	apiPrefix: string

	@IsNotEmpty()
	@IsString()
	env: string
}
