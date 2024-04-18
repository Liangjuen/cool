import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

/**
 * 访问 token
 */
export class AccessToken {
	@IsString()
	@IsNotEmpty()
	secret: string

	@IsNumber()
	@IsNotEmpty()
	duration: number
}
