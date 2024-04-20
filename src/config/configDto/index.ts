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

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test'
}

export class EnvironmentVariables {
	@IsNotEmpty()
	@IsEnum(Environment)
	env: Environment

	@IsNotEmpty()
	@IsString()
	authorized: string

	@ValidateNested()
	database: Database

	@ValidateNested()
	app: App

	@ValidateNested()
	accessToken: AccessToken

	@ValidateNested()
	redis: Redis

	@ValidateNested()
	mailer: Mailer

	@ValidateNested()
	qiniu: Qiniu
}

/**
 * 环境变量校验器
 * @param config
 */
export const validate = (config: Record<string, any>) => {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true
	})
	const errors = validateSync(validatedConfig, { skipMissingProperties: false })

	const logger = new Logger('EnvConfigValidate')
	const name = envFileName()

	if (errors.length > 0) {
		// 打印错误节点
		errors.forEach(e => {
			logger.error(`配置项 [${e.property}] 无效配置`)
		})

		logger.warn(`请检查 ${name}.yaml 文件配置`)

		// 退出程序
		process.exit(0)
	}
}
