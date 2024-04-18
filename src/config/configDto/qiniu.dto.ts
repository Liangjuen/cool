import { IsString, IsNotEmpty } from 'class-validator'

/**
 * 七牛云服务
 */
export class Qiniu {
	@IsNotEmpty()
	@IsString()
	accessKey: string

	@IsNotEmpty()
	@IsString()
	secretKey: string

	@IsNotEmpty()
	@IsString()
	domain: string

	@IsNotEmpty()
	@IsString()
	bucket: string

	@IsNotEmpty()
	@IsString()
	uploadUrl: string

	@IsNotEmpty()
	@IsString()
	region: string
}
