import { plainToInstance } from 'class-transformer'
import { IsString, IsNotEmpty, IsEnum, validateSync, ValidateNested } from 'class-validator'
import { Logger } from '@nestjs/common'

import { envFileName } from '../env'
import { AccessToken } from './access-token.dto'
import { App } from './app.dto'
import { Database } from './database.dto'
import { Mailer } from './mailer.dto'
import { Qiniu } from './qiniu.dto'
import { Redis } from './redis.dto'
import { Upload } from './upload.dto'
import { FileUpload } from './file.dto'

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test'
}

export class ConfigDto {
	@IsNotEmpty()
	@IsEnum(Environment)
	env: Environment

	@IsNotEmpty()
	@IsString()
	authorized: string

	@IsNotEmpty()
	@ValidateNested()
	database: Database

	@IsNotEmpty()
	@ValidateNested()
	app: App

	@IsNotEmpty()
	@ValidateNested()
	accessToken: AccessToken

	@IsNotEmpty()
	@ValidateNested()
	redis: Redis

	@ValidateNested()
	mailer: Mailer

	@IsNotEmpty()
	@ValidateNested()
	file: FileUpload

	@ValidateNested()
	qiniu: Qiniu

	@ValidateNested()
	upload: Upload
}

/**
 * 环境变量校验器
 * @param config
 */
export const validate = (config: Record<string, any>) => {
	const validatedConfig = plainToInstance(ConfigDto, config, {
		enableImplicitConversion: true
	})
	const errors = validateSync(validatedConfig, { skipMissingProperties: false })

	const logger = new Logger('EnvConfigValidate')
	const name = envFileName()

	if (errors.length > 0) {
		// 打印错误节点
		errors.forEach(e => {
			logger.error(`配置项 [${e.property}] 无效配置，请查看 template.yaml 配置说明`)
		})

		logger.warn(`请检查 ${name}.yaml 文件配置`)

		// 退出程序
		process.exit(0)
	}
}
